const { expect } = require('chai');
const { stub } = require('sinon');
const Logler = require('../');

describe('#onLog On Log event handler', () => {
    it('should be called when ever a log is made', () => {
        const onLog = stub();

        const logger = new Logler({
            onLog,
            serializer(...args) {
                return args.join(' ');
            },
            format(tokens, level, msg) {
                return msg;
            },
        });

        logger.debug('test');

        expect(onLog.called).to.be.true;
        expect(onLog.calledOnce).to.be.true;
        expect(onLog.calledWith('debug', { serializedMsg: 'test', args: ['test'] }));
    });
});
