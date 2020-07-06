import Configuration from './@types/Configuration'

import { init } from './config'
import Request from './request'

class Scraper {
    configuration: Configuration

    constructor (apiKey: string, userConfiguration: Configuration = {}) {
        this.configuration = init(apiKey, userConfiguration)
    }

    request(url: string) {
        return new Request(url, this.configuration)
    }
}

module.exports = Scraper
