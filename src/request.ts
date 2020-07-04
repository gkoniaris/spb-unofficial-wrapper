import axios from 'axios'
import * as builder from './builder'

export default function (this: any, url: string) {
   const headers = builder.getHeaders(this.configuration)
   const params = builder.getParams(this.configuration, url)

   axios.get('https://app.scrapingbee.com/api/v1/', {
      headers,
      params
   }).then(response => {
      console.log(response)
   })
}