import MiddlewareInterface from './middleware-interface'
import uuid from 'node-uuid'

export default class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      ctx.set('x-request-id', uuid.v4())
      await next()
    })
  }
}
