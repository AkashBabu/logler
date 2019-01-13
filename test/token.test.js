const { expect } = require('chai');
const sinon = require('sinon');
const Logler = require('../');

describe('#token Token', () => {
    it('should call every tokens for every log made', () => {
        const timestamp = sinon.stub();
        const id = sinon.stub();

        const logger = new Logler({
            tokens: {
                timestamp,
                id,
            },
        });

        logger.debug('test token');

        expect(timestamp.called).to.be.true;
        expect(id.called).to.be.true;
    });
    it('should call token with level and log arguments', () => {
        const token = sinon.stub();

        const logger = new Logler({
            tokens: {
                token,
            },
        });

        logger.debug('test token');

        expect(token.calledWith('debug', 'test token')).to.be.true;
    });
})
;
