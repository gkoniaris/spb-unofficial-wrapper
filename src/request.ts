import axios from 'axios'

import Configuration from './@types/Configuration';
import Header from './@types/Header'
import * as builder from './builder'

/**
 * Executes the current request and returns it's data, status code
 * and cost information
 * 
 * @param headers
 * @param params 
 */
const execute = function (headers: Array<Header>, params: any) {
   axios.get('https://app.scrapingbee.com/api/v1/', {
      headers,
      params
   }).then(response => {
      console.log(response)
   }).catch(e => [
      console.log(e)
   ])
}

/**
 * Returns the number of credits required to perform the current request 
 * without actually performing it
 * 
 * @param configuration
 */
const calculateCost = function(configuration: Configuration) {
   if (!configuration.javascript.render && !configuration.settings.premiumProxy) return 1
   if (configuration.javascript.render && !configuration.settings.premiumProxy) return 5
   if (!configuration.javascript.render && configuration.settings.premiumProxy) return 10
   if (configuration.javascript.render && configuration.settings.premiumProxy) return 100
}

export default function (this: any, url: string) {
   const headers = builder.getHeaders(this.configuration)
   const params = builder.getParams(this.configuration, url)

   this.execute = () => execute(headers, params)
   this.calculateCost = () => calculateCost(this.configuration)
   this.getConfiguration = () => this.configuration

   Object.assign(this, builder.setters)

   return this
}