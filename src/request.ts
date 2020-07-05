import axios from 'axios'

import Configuration from './@types/Configuration';
import Header from './@types/Header'
import * as config from './config'
import * as builder from './builder'

/**
 * Executes the current request and returns it's data, status code
 * and cost information.
 * 
 * @memberof Request
 * 
 * @param headers
 * @param params 
 */
const get = function (configuration: Configuration, url: string) {
   const headers: Array<Header> = config.getHeaders(configuration)
   const params: any = config.getParams(configuration, url)

   return axios.get('https://app.scrapingbee.com/api/v1/', {
      headers,
      params
   }).then(response => {
      return {
         data: response.data,
         headers: response.headers,
         cost: parseInt(response.headers['spb-cost']),
         statusCode: parseInt(response.headers['spb-initial-status-code']),
         resolvedUrl: response.headers['spb-resolved-url']
      }
   }).catch(e => {
      const response = e.response

      return Promise.reject({
         error: response.data.message,
         status: response.status,
         headers: response.headers
      })
   })
}

/**
 * Returns the number of credits required to perform the current request 
 * without actually performing it.
 * 
 * @memberof Request
 *
 * @param configuration
 */
const calculateCost = function(configuration: Configuration) {
   // No js render and no premium proxy
   if (!configuration.javascript.render && !configuration.settings.premiumProxy) return 1
   // Js render and no premium proxy
   if (configuration.javascript.render && !configuration.settings.premiumProxy) return 5
   // No js render and premium proxy
   if (!configuration.javascript.render && configuration.settings.premiumProxy) return 10
   // Js render and premium proxy
   if (configuration.javascript.render && configuration.settings.premiumProxy) return 100
}

/**
 * Request namespace
 * @namespace Request
 */
export default function (url: string, configuration: Configuration) {
   this.configuration = Object.assign({}, configuration)

   this.get = () => get(this.configuration, url)
   this.calculateCost = () => calculateCost(this.configuration)

   Object.assign(this, config)
   Object.assign(this, builder)

   return this
}