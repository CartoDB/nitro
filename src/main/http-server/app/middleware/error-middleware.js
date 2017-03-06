import MiddlewareInterface from './middleware-interface'

export default class ErrorMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        ctx.log.error(err)
        throw err // delegates to koa's default error middleware
      }
    })
  }
}
