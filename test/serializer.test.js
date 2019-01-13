const { expect } = require('chai');
const Logler = require('../');

describe('#serializer Serializer', () => {
    it('should call serializer with the log arguments', () => {
        const logArgs = [1, 'a', { a: 1 }];
        function serializer(...args) {
            logArgs.forEach((arg, i) => {
                expect(arg).to.be.eql(args[i]);
            });
            return args.join(' ');
        }

        const logger = new Logler({
            serializer,
        });

        logger.debug(...logArgs);
    });
});
