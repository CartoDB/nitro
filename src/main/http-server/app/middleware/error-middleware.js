import Middleware from './middleware'

export default class ErrorMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.log.error(err)
        throw err // delegates to koa's default error middleware
      }
    }
  }
}
