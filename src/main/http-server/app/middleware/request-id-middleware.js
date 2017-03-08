import Middleware from './middleware'
import uuid from 'node-uuid'

export default class RequestIdMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      ctx.state.requestId = ctx.get('x-request-id') || uuid.v4()
      ctx.set('X-Request-ID', ctx.state.requestId)
      await next()
    }
  }
}
