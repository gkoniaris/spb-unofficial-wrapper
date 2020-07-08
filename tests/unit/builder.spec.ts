import { expect, assert } from 'chai'
import 'mocha'

import Configuration from '../../src/@types/Configuration'
import Config from '../../src/Config'
import Builder from '../../src/Builder'

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
});