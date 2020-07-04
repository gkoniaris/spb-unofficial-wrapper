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
 * Builder namespace
 * @namespace Builder
 */
export {
    setApiKey,
    setAdsBlocking,
    setResourcesBlocking
}