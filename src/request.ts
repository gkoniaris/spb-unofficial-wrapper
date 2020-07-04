import axios from 'axios'
import * as builder from './builder'

export default function (this: any, url: string) {
   const headers = builder.getHeaders(this.configuration)

   axios.get(url)
}