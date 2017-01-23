import MiddlewareInterface from './middleware-interface'

export default class LogMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      ctx.log.info({ req: ctx.req })
      await next()
    })
  }
}
