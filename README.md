# logler [![Build Status](https://travis-ci.com/AkashBabu/logler.svg?branch=master)](https://travis-ci.com/AkashBabu/logler) [![Maintainability](https://api.codeclimate.com/v1/badges/11ea6ce1fac48e5d9a3b/maintainability)](https://codeclimate.com/github/AkashBabu/logler/maintainability) [![Coverage Status](https://coveralls.io/repos/github/AkashBabu/logler/badge.svg?branch=master)](https://coveralls.io/github/AkashBabu/logler?branch=master)
Bare minimum and fully configurable library needed to build/implement your own logger

## Introduction

You can configure right from serializer to log format!!! In other words you may write very simple plugins and have a logger of your own kind. Serves the flexibility of creating a logger for any purpose including logging into DB or writing to a stream etc

This library was built to solve the following problems:
* Should be able to accomodate a unique ID for all the logs related to a request (even though asynchronous)
* Should provide integrations to log trackers like Sentry etc.
* Should be able to use any writers (could be stream based or DB based or a simple console logs)
* Should be flexible enough for writing logs in any format
* Should print colorful logs, such that it is really easy during development
* Should allow printing of objects as well (without using JSON.stringify 🎉)
* Should print fileName, lineNo & colNo so that debugging is a piece of cake
* Last but not the least, it should be flexible enough to accomodate different needs!!!

Note: *If the above wins are NOT what you are looking for then please try other libraries like [log4js](https://www.npmjs.com/package/log4js), [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston) etc.*

## Installation
> npm i logler -S

## Usage (Simple)
```js
import Logler from 'logler'

const logger = new Logler()
logger.trace('Hey Logler!')
logger.debug('Hey Logler!')
logger.info('Hey Logler!')
logger.log('Hey Logler!')
logger.warn('Hey Logler!')
logger.error('Hey Logler!')
logger.fatal('Hey Logler!')
// => 2019-01-12T18:34:51.512Z <DEBUG> Hey Logler!
// That's just not it! Trust me there is a lots more 
// you can do with this library, 
// please continue reading...
```

## API Documentation:
For API Docs visit [this page](typings/README.md)


## Create a new plugin
Configure all the required options and export the same. So that when these options are used in the library then Logger would be according to your configuration and hence called plugin!

#### Sample (with HTTP Request Id integration)

Please note that all the options are optional, so you can configure only the necessary fields
```js
// plugin.js
const als = require('async-local-storage')

const plugin = {
    format: (tokens, level, msg) => {
        return `${tokens.timestamp} ${tokens.id} <${level.toUpperCase()}> ${msg}`
    },
    tokens: {
        timestamp: () => new Date().toISOString(),
        id: () => als.get('reqId')
    },
    serializer: (...args) => args.map(a => (a instanceof Object ? JSON.stringify(a) : a)).join(' '),
    levels: {
        debug: 'cyan',
        warn: 'yellow',
        error: 'red'
    },
    withColors: true,
}

module.exports = plugin

// lib/logger.js
const Logler = require('logler')
const plugin = require('./plugin')

const logger = new Logler(plugin)
module.exports = logger
```


## How to use plugins
Import the plugin the use it as the first argument to `Logler`

#### Sample
```js
const Logler = require('logler')
const plugin = require('some-plugin')

const logger = new Logler(plugin)
```

## Hooks (onLog)
You can hook custom logic to the logger as shown below

#### Sample (for sentry integration on every error log)
```js
const logger = new Logler({
    onLog: (level, {msg}) => {
        if(level === 'error') {
            require('fs').createWriteStream('./error.log', {flag: 'a'}).write(msg)
        }
    }
})
```


## Contributions
PRs and issues are always welcome. Also check the TODOs below.  
If you are overwhelmed with the flexibility please feel free to create plugins and leave me a message such that I can add it to the list below (currently hidden, because this is soooo new)

## Licence
Seriously!! I don't care about this section, but if you are very keen then, it's MIT.

## TODO
- [x] Filename token
- [x] Line number token
- [x] Stack trace token
- [x] Test Cases
- [ ] Improve Documentation
- [ ] Improve test coverage
- [ ] Github pages
