import MiddlewareInterface from './middleware-interface'

export default class ErrorMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        this.logger.error(err)
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500
        ctx.body = {
          message: err.message
        }
      }
    })
  }
}
