import Configuration from './@types/Configuration'
import Header from './@types/Header'
import Cookie from './@types/Cookie';
import constants from './constants';

/**
 * @class Config
 * 
 */
class Config {
    /**
     * Initializes and injects the configuration into the module instance
     * 
     * @memberof Config
     *
     * @param apiKey {String}
     * @param userConfiguration {Object} 
     */
    init (apiKey: string, userConfiguration: Configuration) {
        if (!apiKey) {
            if (!apiKey) throw new Error('You cannot pass an empty API key')
        }

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
            }
        }
    
        userConfiguration.request = { ...defaultConfiguration.request, ...userConfiguration.request || {} }
        userConfiguration.block = { ...defaultConfiguration.block, ...userConfiguration.block || {} }
        userConfiguration.settings = { ...defaultConfiguration.settings, ...userConfiguration.settings || {} }
        userConfiguration.javascript = { ...defaultConfiguration.javascript, ...userConfiguration.javascript || {} }
        userConfiguration.css = { ...defaultConfiguration.css, ...userConfiguration.css || {} }
    
        if (userConfiguration.settings.countryCode !== '' && !userConfiguration.settings.premiumProxy) {
            throw new Error('Settting proxy country is only allowed in premium proxies')
        }
    
        if (userConfiguration.settings.countryCode !== '' && constants.countryCodes.includes(userConfiguration.settings.countryCode)) {
            throw new Error('Country code provided is not supported')
        }
        
        if (!userConfiguration.settings.premiumProxy) delete userConfiguration.settings.countryCode
    
        const configuration: Configuration = {
            ...defaultConfiguration,
            ...userConfiguration
        }
        
        return configuration
    }

    /**
     * Returns a list of headers that will be forwarded to the 
     * ScrapingBee API
     * 
     * @memberof Config
     *
     * @param configuration {Object}
     */
    getHeaders (configuration: Configuration) {
        const headers: any = {}

        configuration.request.headers.forEach((header: Header) => {
            headers['Spb-' + header.name] = header.value
        })

        return headers
    }

    /**
     * Returns a list of headers that will be forwarded to the 
     * ScrapingBee API
     * 
     * @memberof Config
     *
     * @param configuration {Object}
     */
    getCookies (configuration: Configuration) {
        const cookies: string = configuration.request.cookies.map((cookie: Cookie) => {
            return cookie.name + '=' + cookie.value
        }).join(';')

        return cookies
    }

    /**
     * Returns a list of params that will be sent to the 
     * ScrapingBee API through the querystring
     * 
     * @memberof Config
     *
     * @param configuration {Object}
     * @param url {String}
     */
    getParams (configuration: Configuration, url: string) {
        const cookies = this.getCookies(configuration)

        const params: any = {
            url,
            api_key: configuration.apiKey,
            block_ads: configuration.block.ads,
            block_resources: configuration.block.resources,
            render_js: configuration.javascript.render,
            country_code: configuration.settings.countryCode,
            forward_headers: configuration.request.headers.length > 0
        }

        if (cookies !== '') params.cookies = cookies

        return params
    }
}

export default new Config()