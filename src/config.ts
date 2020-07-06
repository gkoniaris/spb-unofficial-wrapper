import Configuration from './@types/Configuration'
import Header from './@types/Header'

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
     * @param apiKey 
     * @param userConfiguration 
     */
    init (apiKey: string, userConfiguration: Configuration) {
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
     * Returns a list of headers that will be forwarded to the 
     * ScrapingBee API
     * 
     * @memberof Config
     *
     * @param configuration
     */
    getHeaders (configuration: Configuration) {
        const headers: any = {}

        configuration.request.headers.forEach((header: Header) => {
            headers['Spb-' + header.name] = header.value
        })

        return headers
    }

    /**
     * Returns a list of params that will be sent to the 
     * ScrapingBee API through the querystring
     * 
     * @memberof Config
     *
     * @param configuration 
     * @param url 
     */
    getParams (configuration: Configuration, url: string) {   
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
}

export default new Config()