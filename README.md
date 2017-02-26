# nitro

Built-in support for clustering, logging, caching, authentication and other essential facilities for building CARTO APIs. Nitro enables you to focus on writing reusable apps in modular approach.

## Quickstart

```js
import Nitro from 'nitro'
import Maps from 'maps'

const { app, start } = new Nitro()

app.use(async ctx => {
  const start = new Date()
  const { layergroupid, x, y, z } = ctx.query

  ctx.log.info(`looking for tile ${z}/${x}/${y}`)

  const map = await Maps.get(layergroupid)

  ctx.set('content-type', 'image/png')
  ctx.body = await map.tile(x, y, z)

  ctx.metrics.timing(new Date() - start)
})

start()
```

## Features

- Reduce boilerplate code
- Accelerates web application development
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

```bash
$ npm install nitro -S
```

## Configuration

There are two ways to configure `nitro`:
 - By command-line options: `node app.js --port 8000`
 - And programmatically: `const nitro = new Nitro({ port: 8000})`

**Important**: command-line configuration overrides programatic options. See the following configuration:

```js
const options = {
  cluster: {
    enabled: false
  }
}
const nitro = new Nitro(options)

// application code ...
```

then run:

```bash
node app.js --cluster
```

your app will run in **cluster mode**.

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
    -o, --console   Include stdout as log output (true if NODE_ENV is 'undefined' or 'development', otherwise false)
    --no-logger     Disable logger
    --no-metrics    Disable metrics

  Examples
    $ npm start -- -c -p 8000
```

## Application

Nitro provides a `koa` application and is bundled with common middlewares:
 - Identify each request with a unique id and sets a `X-Request-ID` if not provided, otherwise use `X-Request-ID` value as request identifier
 - Handle error responses when something goes wrong
 - Create a sub-logger and binds it to the context
 - Log incoming request, outgoing responses and errors
 - Provide a metrics client to the context to collect useful info about performance & usage

## Logging

Nitro builds a `bunyan` logger and binds a new sub-logger identified by `X-Request-ID` for each request. You can use logger in two ways:
 - At service level through `nitro.logger`
 - At request context level through `ctx.log`

Example:

```js
const { app, logger, start } = new Nitro()

// Service level
logger.info('Initializing app')
// -> {"name":"log-example","role":"server","hostname":"localhost","pid":12018,"level":20,"msg":"Initializing app","time":"2017-02-13T13:47:32.521Z","v":0}

app.use(ctx => {
  // request context
  ctx.log.info({ req: ctx.req }, 'Request received')
  // -> {"name":"log-example","role":"server","hostname":"localhost","pid":12018,"requestId":"1450056d-2586-40af-b9c4-63ed70c87bfe","level":30,"res":{"statusCode":200},"msg":"Request received","time":"2017-02-13T13:48:57.477Z","v":0}
})

start()
```

## Metrics

Nitro creates a `statsD` client to collect stats about usage & performance. You can access it in two ways:
- At service level through `nitro.metrics`
- At request context level through `ctx.metrics`

Example:

```js
const { app, metrics, start } = new Nitro()

metrics.gaugeMemory() // gauge memory usage every 5 seconds

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  ctx.metrics.timing(new Date() - start)
})

start()
```

Nitro sends statistics about memory and CPU usage every 5 seconds, you can define this interval by configuration:

```js
const options = {
  metrics: {
    enabled: true,
    interval: 10000
  }
}
const nitro = new Nitro(options)
```

## Cluster

Nitro supports clustering, you can activate cluster mode:
 - using `--cluster` option: `node app.js --cluster`
 - setting enable to `true` in options to constructor: `{ cluster: { enabled: true } }`

Example:

```js
import Nitro from 'nitro'
import Maps from 'maps'

const { app, role, start } = new Nitro({
  cluster: {
    enabled: true
  }
})

if (role === Nitro.SERVER) {
  app.use(async (ctx, next) => {
    // code ...
    await next()
    // more code ..
  })
}

start()
```

No need to create `workers`, refork or kill them in `master` process. Nitro takes care of this for you. You should configure the `app` only if process' role is `Nitro.SERVER`, otherwise you don't have to do anything. There are two different roles:
 - `Nitro.SERVER`: in charge of response incoming request
 - `Nitro.LEADER`: creates a cluster of `servers` and keeps communication among them

## Cache

TBD

## Authentication

TBD

## User limits

TBD

## Health-checks

TBD

## Requirements

- node >= v6.x
- npm  >= v3.x
