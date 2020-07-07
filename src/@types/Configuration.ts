import Header from './Header'
import Cookie from './Cookie'

type ConfigurationType = {
    apiKey?: string,
    request?: {
        headers?: Array<Header>,
        cookies?: Array<Cookie>,
    }
    block?: {
        ads?: boolean,
        resources?: boolean
    },
    settings?: {
        premiumProxy?: boolean,
        countryCode?: string
    },
    javascript?: {
        render?: boolean,
        snippet?: string,
        waitForLoad?: number,
        responseWithoutRunningJs?: boolean
    },
    css?: {
        waitForSelector?: string
    },
}

export default ConfigurationType