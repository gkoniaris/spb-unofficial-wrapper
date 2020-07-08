import { expect, assert } from 'chai'
import 'mocha'

import Configuration from '../../src/@types/Configuration'
import Config from '../../src/Config'
import Builder from '../../src/Builder'

describe('Builder', function() {
    let configuration:Configuration = {}
    let countryCodes = ['br', 'ca', 'fr', 'de', 'gr', 'il', 'it', 'mx', 'nl', 'ru', 'es', 'se', 'us', 'gb']
    
    before(function() {
        configuration = Config.init('API_KEY', {})
    })

    it('should correctly set a new API key', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setApiKey('NEW_API_KEY')

        expect(builder.configuration.apiKey).to.equal('NEW_API_KEY')
    })

    it('should not allow an empty api key to be set', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        assert.throw(function() {
            builder.setApiKey('')
        }, Error)
    })

    it('should correctly set block ads flag to false', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setAdsBlocking(false)

        expect(builder.configuration.block.ads).to.equal(false)
    })

    it('should correctly set block ads flag to true', function() {
        const builder = new Builder(Object.assign({}, configuration, { block: { ads: false } }))
        
        expect(builder.configuration.block.ads).to.equal(false)

        builder.setAdsBlocking(true)

        expect(builder.configuration.block.ads).to.equal(true)
    })

    it('should correctly set block resources flag to false', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setResourcesBlocking(false)

        expect(builder.configuration.block.resources).to.equal(false)
    })

    it('should correctly set block resources flag to true', function() {
        const builder = new Builder(Object.assign({}, configuration, { block: { resources: false } }))
        
        expect(builder.configuration.block.resources).to.equal(false)

        builder.setResourcesBlocking(true)

        expect(builder.configuration.block.resources).to.equal(true)
    })

    it('should not allow country code to be set for non premium proxies', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        assert.throw(function() {
            builder.setCountryCode('br')
        }, Error)
    })

    countryCodes.forEach(function(countryCode) {
        it('should correctly set country code for countryCode: ' + countryCode + ' when a premium proxy is used', function() {
            const builder = new Builder(Object.assign({}, configuration, { settings: { premiumProxy: true } },))
            
            builder.setCountryCode('br')
        })
    })

    it('should not allow country code to be set for a premium proxy with an invalid country code', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        assert.throw(function() {
            builder.setCountryCode('zz')
        }, Error)
    })
})