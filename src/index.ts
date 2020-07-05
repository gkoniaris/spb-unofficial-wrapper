import Configuration from './@types/Configuration'

import { init } from './config'
import request from './request'

module.exports = function (apiKey: string, userConfiguration: Configuration) {
    const configuration = init(apiKey, userConfiguration)

    return {
        request: (url: string) => request(url, configuration)
    }
}
