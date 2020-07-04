import Configuration from './@types/Configuration'

export const initConfiguration = function (userConfiguration: Configuration) {
    const defaultConfiguration: Configuration = {
        apiKey: '',
        request: {
            cookies: [],
            headers: [],
        },
        block: {
            ads: true,
            resources: false
        },
        settings: {
            premiumProxy: false,
            countryCode: ''
        },
        javascript: {
            render: true,
            snippet: '',
            waitForLoad: 0,
            responseWithoutRunningJs: false
        },
        css: {
            waitForSelector: ''
        },
    }

    userConfiguration.request = { ...defaultConfiguration.request, ...userConfiguration.request || {} }
    userConfiguration.block = { ...defaultConfiguration.block, ...userConfiguration.block || {} }
    userConfiguration.settings = { ...defaultConfiguration.settings, ...userConfiguration.settings || {} }
    userConfiguration.javascript = { ...defaultConfiguration.javascript, ...userConfiguration.javascript || {} }
    userConfiguration.css = { ...defaultConfiguration.css, ...userConfiguration.css || {} }

    const configuration: Configuration = {
        ...defaultConfiguration,
        ...userConfiguration
    }
    
    return configuration
}