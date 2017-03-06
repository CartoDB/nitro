import MiddlewareInterface from './middleware-interface'

export default class LogMiddleware extends MiddlewareInterface {
  constructor (logger) {
    super()
    this.logger = logger
  }

  regist (app) {
    app.use(async (ctx, next) => {
      ctx.log = this.logger.child(ctx.state.requestId)
      ctx.log.info({ req: ctx.req })
      await next()
      ctx.log.info({ res: ctx.res })
    })
  }
}
