import axios from 'axios'

import Configuration from './@types/Configuration';
import Header from './@types/Header'
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

   /**
    * Executes the current request and returns it's data, status code
    * and cost information.
    */
   get() {
      const headers: Array<Header> = Config.getHeaders(this.configuration)
      const params: any = Config.getParams(this.configuration, this.url)

      return axios.get('https://app.scrapingbee.com/api/v1/', {
         headers,
         params
      }).then(response => {
         return {
            data: response.data,
            headers: response.headers,
            cost: parseInt(response.headers['spb-cost']),
            statusCode: parseInt(response.headers['spb-initial-status-code']),
            resolvedURL: response.headers['spb-resolved-url']
         }
      }).catch(e => {
         const response = e.response

         return Promise.reject({
            error: response.data.message,
            statusCode: response.status,
            headers: response.headers,
            cost: parseInt(response.headers['spb-cost'])
         })
      })
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
