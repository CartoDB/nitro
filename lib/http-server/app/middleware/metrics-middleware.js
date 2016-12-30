'use strict'

const MiddlewareInterface = require('./middleware-interface')

class MetricsMiddleware extends MiddlewareInterface {
  constructor (metrics) {
    super()
    this.metrics = metrics
  }

  regist (app) {
    app.use(async (ctx, next) => {
      ctx.metrics = this.metrics
      await next()
    })
  }
}

module.exports = MetricsMiddleware
