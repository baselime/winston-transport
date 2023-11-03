import winston from 'winston';
import { BaselimeTransport } from '../dist/index.js';

const logger = winston.createLogger({
    transports: [
        new BaselimeTransport({
            baselimeApiKey: '72df1af98c1b3852c87d5cfadd21ef5d78276ca9'
        })
    ]
})

logger.info('Hello World!');

logger.error('This is an error!')

logger.warn('This is a warning!')

logger.info("This is an info message", {
    foo: 'bar',
    baz: 'qux',
    nested: {
        hello: 'world'
    }
})