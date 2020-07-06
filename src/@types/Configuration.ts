import Header from './Header'

type ConfigurationType = {
    apiKey?: string,
    request?: {
        headers?: Array<Header>,
        cookies?: Array<Object>,
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