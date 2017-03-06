import FactoryInterface from '../factory-interface'
import App from './app/app'
import Koa from 'koa'
import AppMiddlewares from './app/middleware/app-middlewares'
import ErrorMiddleware from './app/middleware/error-middleware'
import RequestIdMiddleware from './app/middleware/request-id-middleware'
import LogMiddleware from './app/middleware/log-middleware'
import MetricsMiddleware from './app/middleware/metrics-middleware'
import ResponseTimeMiddleware from './app/middleware/response-time-middleware'
import HttpServer from './http-server'

export default class HttpServerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const port = options.port
    const koa = new Koa()

    const middlewares = new AppMiddlewares()
      .add(new ErrorMiddleware())
      .add(new RequestIdMiddleware())
      .add(new LogMiddleware(logger))
      .add(new MetricsMiddleware(metrics))
      .add(new ResponseTimeMiddleware())

    const app = new App(koa, middlewares)

    return new HttpServer(app, port, logger)
  }
}
