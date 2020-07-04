import Configuration from './@types/Configuration'
import Header from './@types/Header'

/**
 * test
 * 
 * @memberof Config
 *
 * @param apiKey 
 * @param userConfiguration 
 */
const init = function (apiKey: string, userConfiguration: Configuration) {
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

    if (!userConfiguration.settings.premiumProxy) delete userConfiguration.settings.countryCode

    const configuration: Configuration = {
        ...defaultConfiguration,
        ...userConfiguration
    }
    
    return configuration
}

/**
 * Returns a list of headers
 * 
 * @memberof Config
 *
 * @param configuration
 */
const getHeaders = function (configuration: Configuration) {
    const headers: any = {}

    configuration.request.headers.forEach((header: Header) => {
        headers['Spb-' + header.name] = header.value
    })

    return headers
}

/**
 * test 
 * @memberof Config
 *
 * @param configuration 
 * @param url 
 */
const getParams = function (configuration: Configuration, url: string) {   
    const params = {
        url,
        api_key: configuration.apiKey,
        block_ads: configuration.block.ads,
        block_resources: configuration.block.resources,
        render_js: configuration.javascript.render,
        country_code: configuration.settings.countryCode,
        forward_headers: configuration.request.headers.length > 0
    }

    return params
}

/**
 * Config namespace
 * @namespace Config
 */
export {
    init,
    getHeaders,
    getParams
}