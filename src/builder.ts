import Configuration from './@types/Configuration'
import Header from './@types/Header'

/**
 * Returns a list of headers
 * 
 * @param configuration
 */
export const getHeaders = function (configuration: Configuration) {
    const headers: any = {}

    configuration.request.headers.forEach((header: Header) => {
        headers['Spb-' + header.name] = header.value
    })

    return headers
}

export const getParams = function (configuration: Configuration, url: string) {   
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

export const setters = {
    setAdsBlocking: function(this: any, blockFlag: boolean) {
        this.configuration.block.ads = blockFlag
    
        return this
    },
    setResourcesBlocking: function(blockFlag: boolean, configuration: Configuration) {
        this.configuration.block.resources = blockFlag
    
        return this
    }
}
