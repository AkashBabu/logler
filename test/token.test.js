const { expect } = require('chai');
const sinon = require('sinon');
const Logler = require('../');
const path = require('path');

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

    it('should include mandatory tokens => fileName, lineNum, colNum', () => {
        const logger = new Logler({
            format({ filePath, fileName, lineNum, colNum }) {
                expect(filePath).to.be.eql(__filename);
                expect(fileName).to.be.eql(path.parse(__filename).base);
                expect(lineNum).to.be.eql(48);
                expect(colNum).to.be.eql(16);
                // expect(stack).not.to.be.undefined;
            },
        });

        logger.debug('test token');
    });
})
;
