import Configuration from './@types/Configuration'

import { init } from './config'
import request from './request'

module.exports = function (apiKey: string, userConfiguration: Configuration) {
    const configuration = init(apiKey, userConfiguration)

    return {
        request: request.bind({configuration})
    }
}
