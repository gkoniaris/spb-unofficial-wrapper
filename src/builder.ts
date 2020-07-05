import Header from "./@types/Header";

/**
 * Sets the api key
 * 
 * @memberof Builder
 *
 * @param apiKey 
 */
const setApiKey = function(apiKey: string) {
    this.configuration.apiKey = apiKey

    return this
}

/**
 * Sets if ads will be blocked
 * 
 * @memberof Builder
 *
 * @param this 
 * @param blockFlag 
 */
const setAdsBlocking = function(this: any, blockFlag: boolean) {
    this.configuration.block.ads = blockFlag

    return this
}

/**
 * Sets if the resources will be blocked
 * 
 * @memberof Builder
 *
 * @param this 
 * @param blockFlag 
 */
const setResourcesBlocking = function(this: any, blockFlag: boolean) {
    this.configuration.block.resources = blockFlag

    return this
}

/**
 * Sets the country of the proxy that will perform the request
 * 
 * @memberof Builder
 *
 * @param this 
 * @param countryCode 
 */
const setCountryCode = function(this: any, countryCode: string) {
    if (!['br', 'ca', 'fr', 'de', 'gr', 'il', 'it', 'mx', 'nl', 'ru', 'es', 'se', 'us', 'gb'].includes(countryCode)) {
        throw new Error('Country code provided is not supported')
    }
    this.configuration.settings.countryCode = countryCode

    return this
}

/**
 * Sets if a premium proxy will be used
 * 
 * @memberof Builder
 *
 * @param this 
 * @param premiumFlag 
 */
const setPremiumProxy = function(this: any, premiumFlag: boolean) {
    this.configuration.settings.premiumProxy = premiumFlag

    return this
}

/**
 * Sets the cookies to be forwarded with the request
 * 
 * @memberof Builder
 *
 * @param this 
 * @param cookies 
 */
const setCookies = function(this: any, cookies: Array<Object>) {
    this.configuration.request.cookies = cookies

    return this
}

/**
 * Sets the headers to be forwarded with the request
 * 
 * @memberof Builder
 *
 * @param this 
 * @param headers 
 */
const setHeaders = function(this: any, headers: Array<Header>) {
    this.configuration.request.headers = headers

    return this
}

/**
 * Builder namespace
 * @namespace Builder
 */
export {
    setApiKey,
    setAdsBlocking,
    setResourcesBlocking,
    setCountryCode,
    setPremiumProxy,
    setCookies,
    setHeaders
}