'use strict'

const FactoryInterface = require('../factory-interface')
const App = require('./app/app')
const Koa = require('koa')
const AppMiddlewares = require('./app/middleware/app-middlewares')
const ErrorMiddleware = require('./app/middleware/error-middleware')
const RequestIdMiddleware = require('./app/middleware/request-id-middleware')
const LogMiddleware = require('./app/middleware/log-middleware')
const MetricsMiddleware = require('./app/middleware/metrics-middleware')
const LogRequestMiddleware = require('./app/middleware/log-request-middleware')
const LogResponseMiddleware = require('./app/middleware/log-response-middleware')
const HttpServer = require('./http-server')

class HttpServerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const port = options.port
    const koa = new Koa()

    const middlewares = new AppMiddlewares()
      .add(new ErrorMiddleware(logger))
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new MetricsMiddleware(metrics))
      .add(new LogRequestMiddleware())
      .add(new LogResponseMiddleware())

    const app = new App(koa, middlewares)

    return new HttpServer(app, port, logger)
  }
}

module.exports = HttpServerFactory
