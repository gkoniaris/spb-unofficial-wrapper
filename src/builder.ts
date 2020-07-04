import Configuration from './@types/Configuration'

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
export const setResourcesBlocking = function(blockFlag: boolean, configuration: Configuration) {
    this.configuration.block.resources = blockFlag

    return this
}
