# winston-transport
Ship logs from winston to baselime

## Installation

```bash
npm i @baselime/winston-transport
```

## Setup
```js
import winston from 'winston';
import { BaselimeTransport } from '@baselime/winston-transport';

const logger = winston.createLogger({
    transports: [
        new BaselimeTransport({
            baselimeApiKey: 'YOUR_API_KEY'
        })
    ]
})

logger.info('Hello World!');
```