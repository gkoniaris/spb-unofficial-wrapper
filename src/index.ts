import Configuration from './@types/Configuration'

import { initConfiguration } from './config'
import request from './request'

export default function (apiKey: string, userConfiguration: Configuration) {
    const configuration = initConfiguration(apiKey, userConfiguration)

    return {
        request: request.bind({configuration})
    }
}
