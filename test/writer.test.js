const { expect } = require('chai');
const Logler = require('../');

describe('#writer Writer', () => {
    it('should call the writer with the serialized msg string if one has been specified', () => {
        function writer(msg) {
            // Just to confirm that this writer was called
            expect(true).to.be.true;

            expect(msg).to.be.a('string');
        }

        const logger = new Logler({
            writer,
        });
        logger.debug('test');
    });
});
