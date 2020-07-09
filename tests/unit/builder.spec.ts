import { expect, assert } from 'chai'
import 'mocha'

import Configuration from '../../src/@types/Configuration'
import Config from '../../src/Config'
import Builder from '../../src/Builder'
import constants from '../../src/constants';

describe('Builder', function() {
    let configuration:Configuration = {}
    
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

    constants.countryCodes.forEach(function(countryCode) {
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

    it('should correctly set premium proxy flag to true', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setPremiumProxy(true)

        expect(builder.configuration.settings.premiumProxy).to.equal(true)
    })

    it('should correctly set premium proxy flag to false', function() {
        const builder = new Builder(Object.assign({}, configuration, { settings: { premiumProxy: true } }))
        
        expect(builder.configuration.settings.premiumProxy).to.equal(true)
        
        builder.setPremiumProxy(false)

        expect(builder.configuration.settings.premiumProxy).to.equal(false)
    })

    it('should correctly set zero cookies', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setCookies([])

        expect(JSON.stringify(builder.configuration.request.cookies)).to.equal(JSON.stringify([]))
    })

    it('should correctly set zero cookies by passing null', function() {
        const builder = new Builder(Object.assign({}, configuration, { 
            request: { 
                cookies: [
                    {
                        'name': 'SESSION_ID',
                        'value': '12345678'
                    }
                ]
            } 
        }))
        
        builder.setCookies(null)

        expect(JSON.stringify(builder.configuration.request.cookies)).to.equal(JSON.stringify([]))
    })

    it('should correctly set one cookie', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setCookies([
            {
                'name': 'SESSION_ID',
                'value': '12345678'
            }
        ])

        expect(JSON.stringify(builder.configuration.request.cookies)).to.equal(JSON.stringify([
            {
                'name': 'SESSION_ID',
                'value': '12345678'
            }
        ]))
    })

    it('should correctly set more than one cookies', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setCookies([
            {
                'name': 'SESSION_ID',
                'value': '12345678'
            },
            {
                'name': 'TRACKING_ID',
                'value': '87654321'
            }
        ])

        expect(JSON.stringify(builder.configuration.request.cookies)).to.equal(JSON.stringify([
            {
                'name': 'SESSION_ID',
                'value': '12345678'
            },
            {
                'name': 'TRACKING_ID',
                'value': '87654321'
            }
        ]))
    })

    
    it('should correctly set zero headers', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setHeaders([])

        expect(JSON.stringify(builder.configuration.request.headers)).to.equal(JSON.stringify([]))
    })

    it('should correctly set zero headers by passing null', function() {
        const builder = new Builder(Object.assign({}, configuration, { 
            request: { 
                headers: [
                    {
                        'name': 'Authorization',
                        'value': '12345678'
                    }
                ]
            } 
        }))
        
        builder.setHeaders(null)

        expect(JSON.stringify(builder.configuration.request.headers)).to.equal(JSON.stringify([]))
    })

    it('should correctly set one header', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setHeaders([
            {
                'name': 'Authorization',
                'value': '12345678'
            }
        ])

        expect(JSON.stringify(builder.configuration.request.headers)).to.equal(JSON.stringify([
            {
                'name': 'Authorization',
                'value': '12345678'
            }
        ]))
    })

    it('should correctly set more than one headers', function() {
        const builder = new Builder(Object.assign({}, configuration))
        
        builder.setHeaders([
            {
                'name': 'Authorization',
                'value': '12345678'
            },
            {
                'name': 'Content-type',
                'value': 'application/json'
            }
        ])

        expect(JSON.stringify(builder.configuration.request.headers)).to.equal(JSON.stringify([
            {
                'name': 'Authorization',
                'value': '12345678'
            },
            {
                'name': 'Content-type',
                'value': 'application/json'
            }
        ]))
    })
})