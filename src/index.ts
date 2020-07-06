import Configuration from './@types/Configuration'

import Config from './config'
import Request from './request'

class Scraper {
    configuration: Configuration

    constructor (apiKey: string, userConfiguration: Configuration = {}) {
        this.configuration = Config.init(apiKey, userConfiguration)
    }

    request(url: string) {
        return new Request(url, this.configuration)
    }
}

module.exports = Scraper
