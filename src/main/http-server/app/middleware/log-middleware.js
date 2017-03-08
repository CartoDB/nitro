import Middleware from './middleware'

export default class LogMiddleware extends Middleware {
  constructor (logger) {
    super()
    this.logger = logger
  }

  middleware () {
    return async (ctx, next) => {
      ctx.log = this.logger.child(ctx.state.requestId)
      ctx.log.info({ req: ctx.request })
      await next()
      ctx.log.info({ res: ctx.response })
    }
  }
}
