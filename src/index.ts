import Configuration from './@types/Configuration'

import Config from './Config'
import Request from './Request'

class Scraper {
    configuration: Configuration

    /**
     * 
     * @param apiKey {String}
     * @param userConfiguration {Object} 
     */
    constructor (apiKey: string, userConfiguration: Configuration = {}) {
        this.configuration = Config.init(apiKey, userConfiguration)
    }

    /**
     * Returns a request instance that also contains all
     * commands of the Builder class
     * 
     * @param url {String}
     */
    request(url: string) {
        return new Request(url, this.configuration)
    }
}

module.exports = Scraper
