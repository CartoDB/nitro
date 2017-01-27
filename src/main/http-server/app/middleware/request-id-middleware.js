import MiddlewareInterface from './middleware-interface'
import uuid from 'node-uuid'

export default class RequestIdMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      let requestId = ctx.get('x-request-id')

      if (!requestId) {
        requestId = uuid.v4()
      }

      ctx.set('x-request-id', requestId)

      await next()
    })
  }
}
