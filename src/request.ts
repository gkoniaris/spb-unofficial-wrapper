import axios from 'axios'

import Configuration from './@types/Configuration';
import Header from './@types/Header'
import * as config from './config'
import * as builder from './builder'

/**
 * Executes the current request and returns it's data, status code
 * and cost information
 * 
 * @param headers
 * @param params 
 */
const execute = function (url: string) {
   const headers: Array<Header> = config.getHeaders(this.configuration)
   const params: any = config.getParams(this.configuration, url)

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

   this.execute = execute.bind(this)
   this.calculateCost = () => calculateCost(this.configuration)

   Object.assign(this, config)
   Object.assign(this, builder)

   return this
}