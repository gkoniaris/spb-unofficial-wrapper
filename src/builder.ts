import Header from "./@types/Header"
import Cookie from "./@types/Cookie"
import Configuration from "./@types/Configuration"
/**
 * @class Builder
 * 
 * @param configuration
 */
class Builder {
    configuration: Configuration

    constructor(configuration: Configuration) {
        this.configuration = configuration
    }

    /**
     * Sets the api key of the current request instance
     * 
     * @param apiKey {String} The api key that will be used to perform the requests
     */
    setApiKey(apiKey: string) {
        this.configuration.apiKey = apiKey
    
        return this
    }

    /**
     * Sets if ads will be blocked for the current request
     *
     * @param blockFlag {Boolean}
     */
    setAdsBlocking(blockFlag: boolean) {
        this.configuration.block.ads = blockFlag

        return this
    }
    
    /**
     * Sets if the resources will be blocked
     * 
     * @param blockFlag {Boolean}
     */
    setResourcesBlocking(blockFlag: boolean) {
        this.configuration.block.resources = blockFlag

        return this
    }

    /**
     * Sets the country of the proxy that will perform the request
     *
     * @param countryCode 
     */
    setCountryCode(countryCode: string) {
        if (!['br', 'ca', 'fr', 'de', 'gr', 'il', 'it', 'mx', 'nl', 'ru', 'es', 'se', 'us', 'gb'].includes(countryCode)) {
            throw new Error('Country code provided is not supported')
        }

        this.configuration.settings.countryCode = countryCode

        return this
    }

    /**
     * Sets if a premium proxy will be used
     *
     * @param premiumFlag 
     */
    setPremiumProxy(premiumFlag: boolean) {
        this.configuration.settings.premiumProxy = premiumFlag

        return this
    }

    /**
     * Sets the cookies to be forwarded with the request
     *
     * @param cookies 
     */
    setCookies(this: any, cookies: Array<Cookie>) {
        this.configuration.request.cookies = cookies

        return this
    }

    /**
     * Sets the headers to be forwarded with the request
     *
     * @param headers 
     */
    setHeaders(this: any, headers: Array<Header>) {
        this.configuration.request.headers = headers

        return this
    }

    /**
     * Sets if the javascript that the requested page contains 
     * will be rendered or not
     *
     * @param renderFlag 
     */
    setJavascriptRendering(this: any, renderFlag: boolean) {
        this.configuration.javascript.render = renderFlag

        return this
    }

    /**
     * Sets a javascript snippet that will be executed after the
     * requested page has completed loading
     * 
     * @param snippet 
     */
    setJavascriptSnippet(this: any, snippet: string) {
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
     * @param wait 
     */
    setJavascriptWaitForLoad(this: any, wait: number) {
        this.configuration.javascript.waitForLoad = wait

        return this
    }

    /**
     * Sets a selector which the browser must wait to be visible
     * before returning the webpage code.
     *
     * @param selector
     */
    setJavascriptWaitForSelector(this: any, selector: string) {
        this.configuration.javascript.waitForSelector = selector

        return this
    }
}

export default Builder
