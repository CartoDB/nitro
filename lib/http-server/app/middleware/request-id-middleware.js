'use strict'

const MiddlewareInterface = require('./middleware-interface')
const uuid = require('node-uuid')

class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      ctx.set('x-request-id', uuid.v4())
      await next()
    })
  }
}

module.exports = RequestIdMiddleware
