import axios from 'axios'

export default function (this: any, url: string) {
   axios.get(url)
}