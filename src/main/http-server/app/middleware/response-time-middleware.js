import Middleware from './middleware'

export default class ResponseTimeMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      const start = Date.now()
      await next()
      const delta = Math.ceil(Date.now() - start)

      ctx.set('X-Response-Time', `${delta}ms`)
    }
  }
}
