import MiddlewareInterface from './middleware-interface'

export default class LogResponseMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const elapsed = new Date() - start

      ctx.set('x-response-time', elapsed)
      ctx.log.info({ res: ctx.res })
    })
  }
}
