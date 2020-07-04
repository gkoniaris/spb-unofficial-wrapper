import axios from 'axios'

import Header from './@types/Header'
import * as builder from './builder'


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

export default function (this: any, url: string) {
   const headers = builder.getHeaders(this.configuration)
   const params = builder.getParams(this.configuration, url)

   return {
      execute: () => execute(headers, params)
   }
}