import Configuration from './@types/Configuration'

export const initConfiguration = function (apiKey: string, userConfiguration: Configuration) {
    const defaultConfiguration: Configuration = {
        apiKey,
        request: {
            cookies: [],
            headers: [],
        },
        block: {
            ads: true,
            resources: true
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

    if (userConfiguration.settings.countryCode !== '' && !userConfiguration.settings.premiumProxy) {
        throw new Error('You cannot set a proxy in a specific country without using a premium proxy')
    }

    const configuration: Configuration = {
        ...defaultConfiguration,
        ...userConfiguration
    }
    
    return configuration
}