const moment = require('moment');
const { expect } = require('chai');
const Logler = require('../');

describe('#default Default', () => {
    const logger = new Logler({
        writer: () => {},
    });

    it('should have debug, info, warn & error as default log levels', () => {
        expect(logger.debug).to.be.a('function');
        expect(logger.info).to.be.a('function');
        expect(logger.warn).to.be.a('function');
        expect(logger.error).to.be.a('function');
    });
    it('should print in "{timestamp} {<level>} {msg}" format', () => {
        const msg = logger.debug('test');
        const [timestamp, level, serializedMsg] = msg.split(' ');

        expect(moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()).to.be.true;
        expect(level).to.match(/DEBUG/);
        expect(serializedMsg).to.be.eql('test');
    });
    it('should JSON.stringify objects and join all the arguments with space in between', () => {
        const msg = logger.debug({ a: 1 });
        const [,, serializedMsg] = msg.split(' ');
        expect(serializedMsg).to.be.eql(JSON.stringify({ a: 1 }));
    });
    it('should provide timestamp as default tokens', () => {
        const msg = logger.debug('test');
        const [timestamp] = msg.split(' ');

        expect(moment(timestamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isValid()).to.be.true;
    });
    // it('should write the result to process.stdout stream', () => {
    //     let called = false;
    //     process.stdout.write = function () {
    //         called = true;
    //     };

    //     logger.debug('test');

    //     expect(called).to.be.true;
    // });
});
