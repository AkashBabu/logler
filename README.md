# logler [![Build Status](https://travis-ci.com/AkashBabu/logler.svg?branch=master)](https://travis-ci.com/AkashBabu/logler) [![Maintainability](https://api.codeclimate.com/v1/badges/11ea6ce1fac48e5d9a3b/maintainability)](https://codeclimate.com/github/AkashBabu/logler/maintainability)
Bare minimum and fully configurable library needed to build/implement your own logger

## Introduction
You can configure right from serializer to message format!!! In other words you may write very simple plugins and have a logger of your own kind. Serves the flexibility of creating a logger for any purpose including logging into DB or writing to a stream etc

## Installation
> npm install logler --save-prod

## Usage (Simple)
```js
const logger = new Logler()
logger.debug('Hey Logler!')
// => 2019-01-12T18:34:51.512Z <DEBUG> Hey Logler!
// That's just not it! Trust me there is a lots more 
// you can do with this library, 
// please continue reading...
```

## Constructor
**new Logler(opts)**  
`opts` is an Object with the following properties:  

*Note: `...args` represent the list of arguments that was passed to the logger*

| Property | Description | Default |
|:---------|:------------|:--------|
| format        | Function of the kind `function(tokens, level, msg) : String`| *({ timestamp, fileName, lineNum, colNum }, level, msg) => `${timestamp} [${level.toUpperCase()}] <${fileName}:${lineNum}:${colNum}> ${msg}`;* |
| tokens        | Map with key as token name and value as a function that resolves to the value of the token. This will be called everytime a log is created, so you may use this option to attach `logId` to every log that is connected to the request via `async hooks` | *{timestamp: new Date().toISOString()}* |
| levels        | Map of log level(such as debug, info, warn etc) vs color to be used when `withColor` option is `true`. This has been made configurable because many of the applications might not use all the log levels provided by the library, hence this is your point of configuration where you can specify the levels needed by your application | *{debug : 'cyan', info  : 'green', warn  : 'yellow', error : 'red'}* |
| serializer    | Message serializer can be used to specify your convenience of logs. i.e. you may choose between whether to `JSON.stringify` all objects or stringify all object with indentation or not to stringify at all or the like | *(...args) => args.map(a => (a instanceof Object ? JSON.stringify(a) : a)).join(' ')* |
| lineSeperator | Characters to be used to seperate the lines. | *\r\n* |
| onLog         | On Log event handler function. Function signature should be of the kind `function(level, { serializedMsg, args })` | *undefined* |
| writer        | Function that might be of interest to those who are interested in logging the output to DB or write to a stream or the like | *(msg) => process.stdout.write(msg)* |
| withColors    | Boolean. If true, then the output string will be associated with color properties according to the log level | *false* |



## Create a new plugin
Configure all the required options and export the same. So that when these options are used in the library then Logger would be according to your configuration and hence called plugin!

#### Sample (with HTTP Request Id integration)
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
    onLog: (level, {serializedMsg}) => {
        if(level === 'error') {
            require('fs').createWriteStream('./error.log', {flag: 'a'}).write(serializedMsg)
        }
    }
})
```

## Other Features

* All the log levels are also lower cased and hence if you provide a log level as 'Debug', it can be accessed via both logger.debug and logger.Debug.


## Contributions
PRs and issues are always welcome. Also check the TODOs below.  
If you are overwhelmed with the flexibility please feel free to create plugins and leave me a message such that I can add it to the list below (currently hidden, because this is soooo new)

## Licence
Seriously!! I don't care about this section, but if you are very keen then, it's MIT.

## TODO
- [ ] Test Cases
- [ ] Documentation
- [ ] Github pages
- [ ] Filename token
- [ ] Line number token
- [ ] Stack trace token
- [ ] Create first plugin
