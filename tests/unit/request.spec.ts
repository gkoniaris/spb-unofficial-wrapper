import { expect } from 'chai'
import 'mocha'

import Config from '../../src/Config'
import Request from '../../src/Request'

describe('Request', function() {
    let configuration = {}

    before(function() {
        configuration = Config.init('API_KEY', {})
    })

    it('should be instantiable', () => {
        const request = new Request('https://website.com', configuration)
        
        expect(request.constructor.name).to.equal('Request')
    }) 
});