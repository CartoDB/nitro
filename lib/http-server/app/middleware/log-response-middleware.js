'use strict'

const MiddlewareInterface = require('./middleware-interface')

class LogResponseMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const elapsed = new Date() - start

      ctx.set('x-response-time', elapsed)
      ctx.log.info({ res: ctx.res })
    })
  }
}

module.exports = LogResponseMiddleware
