import Configuration from './@types/Configuration'

/**
 * 
 * @param apiKey 
 */
export const setApiKey = function(apiKey: string) {
    this.configuration.apiKey = apiKey

    return this
}

/**
 * 
 * @param this 
 * @param blockFlag 
 */
export const setAdsBlocking = function(this: any, blockFlag: boolean) {
    this.configuration.block.ads = blockFlag

    return this
}

/**
 * 
 * @param blockFlag 
 * @param configuration 
 */
export const setResourcesBlocking = function(blockFlag: boolean) {
    this.configuration.block.resources = blockFlag

    return this
}
