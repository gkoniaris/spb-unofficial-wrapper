import { expect } from 'chai'
import 'mocha'

import Configuration from '../../src/@types/Configuration'
import Config from '../../src/Config'
import Request from '../../src/Request'

describe('Request', function() {
    let configuration:Configuration = {}

    before(function() {
        configuration = Config.init('API_KEY', {})
    })

    it('should be instantiable', function() {
        const request = new Request('https://website.com', configuration)
        
        expect(request.constructor.name).to.equal('Request')
    })

    it('should instantiate with the correct configuration and url', function() {
        const request = new Request('https://website.com', configuration)

        expect(request.url).to.equal('https://website.com')
        expect(JSON.stringify(request.configuration)).to.equal(JSON.stringify(configuration))
    })
});