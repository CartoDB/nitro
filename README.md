# nitro

Built-in support for clustering, logging, caching, authentication and other essential facilities for building CARTO APIs. Nitro enables you to focus on writing reusable apps in modular approach.

## Quickstart

```js
import Nitro from 'nitro'
import Map from 'maps'

const nitro = new Nitro()

nitro.app.use(async ctx => {
  ctx.log.info({ req: ctx.req })

  const start = new Date()
  const map = await Map.get(ctx.query.layergroupid)

  ctx.set('content-type', 'image/png')
  ctx.body = await map.tile(ctx.query.coords)

  ctx.metrics.timing(new Date() - start)
})

nitro.run()
```

## Features

- Reduce boilerplate code in CARTO APIs
- Common command-line interface
- Cluster support behind the scenes
- Log requests & responses in JSON format
- Memory & CPU monitoring
- App statistics for free
- _Internal cache_
- _User authentication_
- _User limits_
- _Health-checks_
- Graceful shutdown

**Note**: features in italic to be done.

## Installation

Use `-S` or `--save` to include it as dependency in `package.json`

```
$ npm install nitro -S
```

## Configuration

Nitro exposes two ways to be configured:
 - By command-line options: `node app.js --port 8000`
 - And programmatically: `const nitro = new Nitro({ port: 8000})`

**Important**: command-line configuration overrides programatic options. If your app looks like below:

```
cosnt options = {
  cluster: {
    enabled: false
  }
}
const nitro = new Nitro(options)

// application code ...
```

then run:

```
node app.js --cluster
```

your app will run in cluster mode.

## Options

See `src/main/config.js` to check structure and default values.

- name: `string`, application name; default: name defined in your `package.json`
- port: `number`, listening port; default: 3000
- cluster:
  - enabled: `boolean`; default: false
- logger:
  - enabled: `boolean`; default: true
  - console: `boolean`, use stdout to log; default: true if NODE_ENV is 'undefined' or 'development', otherwise false
  - path: `string`, path to log; default: current working directory
- metrics:
  - enabled: `boolean`; default: true
  - host: `url`, host to send stats; default: localhost
  - port: `number`, port to send stats; default: 8125
  - interval: `number`, milliseconds between each report to statsd about CPU & memory usage; default: 5000

## Command-line options

Use `--help` to list all available options:
```
$ node app.js --help

  Map server for CARTO

  Usage:
    $ npm start [-- <options>]

  Options:
    -c, --cluster   Enable cluster mode (default: disable)
    -p, --port      Specific listening port (default: 3000)
    -l, --log-path  Path to log (default: current working directory)
    -o, --console   Include stdout as log output (true if NODE_ENV is undefined or 'development', otherwise false)
    --no-logger     Disable logger
    --no-metrics    Disable metrics

  Examples
    $ npm start -- -c -p 8000
```

## Application

## Logging

## Metrics

## Cache

## Authentication

## User limits

## Health-checks

## Requirements

- node >= v6.x
- npm  >= v3.x
