const { expect } = require('chai');
const Logler = require('../');

describe('#format Format', () => {
    it('should format the log in the specified format', () => {
        const logger = new Logler({
            format: (tokens, level, msg) => `Hey ${msg}`,
        });
        const msg = logger.debug('test');

        expect(msg).to.be.eql('Hey test');
    });
})
;
