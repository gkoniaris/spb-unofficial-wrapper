import Configuration from './@types/Configuration'

import { initConfiguration } from './config'

export default function(userConfiguration: Configuration) {
    const defaultConfiguration = initConfiguration(userConfiguration)
    
}