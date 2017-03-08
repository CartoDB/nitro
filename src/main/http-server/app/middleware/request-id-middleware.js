import MiddlewareInterface from './middleware-interface'
import uuid from 'node-uuid'

export default class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      ctx.state.requestId = ctx.get('x-request-id') || uuid.v4()
      ctx.set('X-Request-ID', ctx.state.requestId)
      await next()
    })
  }
}
