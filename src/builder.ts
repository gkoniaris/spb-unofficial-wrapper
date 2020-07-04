import Configuration from './@types/Configuration'

export const setters = {
    /**
     * 
     * @param this 
     * @param blockFlag 
     */
    setAdsBlocking: function(this: any, blockFlag: boolean) {
        this.configuration.block.ads = blockFlag
    
        return this
    },
    /**
     * 
     * @param blockFlag 
     * @param configuration 
     */
    setResourcesBlocking: function(blockFlag: boolean, configuration: Configuration) {
        this.configuration.block.resources = blockFlag
    
        return this
    }
}
