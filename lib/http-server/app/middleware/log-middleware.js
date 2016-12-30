'use strict'

const MiddlewareInterface = require('./middleware-interface')

class LogMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use(async (ctx, next) => {
      const requestId = ctx.response.get('x-request-id')
      ctx.log = this.logger.child(requestId)
      await next()
    })
  }
}

module.exports = LogMiddleware
