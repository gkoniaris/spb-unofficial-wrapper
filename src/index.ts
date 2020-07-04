import Configuration from './@types/Configuration'

import { initConfiguration } from './config'
import request from './request'

export default function (userConfiguration: Configuration) {
    const defaultConfiguration = initConfiguration(userConfiguration)

    return {
        request: request.bind({defaultConfiguration})
    }
}