import MiddlewareInterface from './middleware-interface'

export default class LogMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use(async (ctx, next) => {
      const requestId = ctx.get('x-request-id')
      ctx.log = this.logger.child(requestId)
      await next()
    })
  }
}
