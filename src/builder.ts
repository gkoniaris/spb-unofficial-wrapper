import Header from "./@types/Header";

/**
 * Sets the api key that will be used to perform the requests
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
 * Sets if the javascript that the requested page contains 
 * will be rendered or not
 * 
 * @memberof Builder
 *
 * @param this 
 * @param renderFlag 
 */
const setJavascriptRendering = function(this: any, renderFlag: boolean) {
    this.configuration.javascript.render = renderFlag

    return this
}

/**
 * Sets a javascript snippet that will be executed after the
 * requested page has completed loading
 * 
 * @memberof Builder
 *
 * @param this 
 * @param snippet 
 */
const setJavascriptSnippet = function(this: any, snippet: string) {
    this.configuration.javascript.snippet = snippet

    return this
}

/**
 * Sets how much time the browser will wait for the page to
 * load completely before returning the webpage code. Useful 
 * if the webpage performs async actions and the browser must 
 * wait for extra time, after the loaded event has been triggered. 
 * Time is passed in ms.
 *  
 * @memberof Builder
 *
 * @param this 
 * @param wait 
 */
const setJavascriptWaitForLoad = function(this: any, wait: number) {
    this.configuration.javascript.waitForLoad = wait

    return this
}

/**
 * Sets a selector which the browser must wait to be visible
 * before returning the webpage code.
 *  
 * @memberof Builder
 *
 * @param this 
 * @param selector
 */
const setJavascriptWaitForSelector = function(this: any, selector: string) {
    this.configuration.javascript.waitForSelector = selector

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
    setHeaders,
    setJavascriptRendering,
    setJavascriptSnippet,
    setJavascriptWaitForLoad,
    setJavascriptWaitForSelector
}