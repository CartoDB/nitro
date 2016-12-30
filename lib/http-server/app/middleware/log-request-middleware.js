'use strict'

const MiddlewareInterface = require('./middleware-interface')

class LogMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      ctx.log.info({ req: ctx.req })
      await next()
    })
  }
}

module.exports = LogMiddleware
