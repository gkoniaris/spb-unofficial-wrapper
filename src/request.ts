import * as https from 'https'

import Configuration from './@types/Configuration';
import Config from './Config'
import Builder from './Builder'

/**
 * @class Request
 *
 * @param url 
 * @param configuration 
 */
class Request {
   url: string
   configuration: Configuration
   
   /**
    * 
    * @param url {String}
    * @param configuration {Object} 
    */
   constructor(url: string, configuration: Configuration) {
      this.url = url
      this.configuration = Object.assign({}, configuration)
   }

   _performRequest(type: string) {
      const headers: any = Config.getHeaders(this.configuration)
      const params: any = Config.getParams(this.configuration, this.url)

      let queryString = ''

      Object.keys(params).forEach((key, idx) => {
         if (params[key] && params[key] !== '') {
            if (idx !== 0) queryString += '&'
            queryString += key + '=' + params[key]
         }
      })

      const options:https.RequestOptions = {
         host: 'app.scrapingbee.com',
         port: '443',
         path: '/api/v1?' + queryString,
         method: 'GET',
         headers
      }

      return new Promise((resolve, reject) => {
         //@ts-ignore
         https[type](options, function(response: any){
            let data = ''

            response.on('data', (chunk: any) => {
               data += chunk
            })

            response.on('end', () => {
               if (response.statusCode < 200 || response.statusCode > 299) {
                  const parsedData = JSON.parse(data)

                  return reject({
                     error: parsedData.error,
                     statusCode: response.statusCode,
                     headers: response.headers,
                     cost: response.headers['spb-cost'] ? parseInt(response.headers['spb-cost']) : 0
                  })
               }
               
               resolve({
                  data: data,
                  headers: response.headers,
                  cost: parseInt(response.headers['spb-cost']),
                  statusCode: parseInt(response.headers['spb-initial-status-code']),
                  resolvedURL: response.headers['spb-resolved-url']
               })
            })
         }).on('error', function(error: any, statusCode: number, responseHeaders: any, body: any) {
            reject({
               error: 'Something went wrong',
               statusCode: statusCode,
               headers: responseHeaders,
               cost: responseHeaders['spb-cost'] ? parseInt(responseHeaders['spb-cost']) : 0
            })
         })
      })
   }
   /**
    * Executes the current request and returns it's data, status code
    * and cost information.
    */
   get() {
      return this._performRequest('get')
   }

   /**
    * Returns the number of credits required to perform the current request 
    * without actually performing it.
    *
    */
   calculateCost() {
      // No js render and no premium proxy
      if (!this.configuration.javascript.render && !this.configuration.settings.premiumProxy) return 1
      // Js render and no premium proxy
      if (this.configuration.javascript.render && !this.configuration.settings.premiumProxy) return 5
      // No js render and premium proxy
      if (!this.configuration.javascript.render && this.configuration.settings.premiumProxy) return 10
      // Js render and premium proxy
      if (this.configuration.javascript.render && this.configuration.settings.premiumProxy) return 100
   }
}

Request.prototype = Object.assign(Request.prototype, Builder.prototype)

export default Request
