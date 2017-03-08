import Middleware from './middleware'

export default class ResponseTimeMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      const start = new Date()
      await next()
      const elapsed = new Date() - start

      ctx.set('X-Response-Time', elapsed)
    }
  }
}
