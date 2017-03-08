import MiddlewareInterface from './middleware-interface'

export default class ResponseTimeMiddleware extends MiddlewareInterface {
  regist (app) {
    app.use(async (ctx, next) => {
      const start = new Date()
      await next()
      const elapsed = new Date() - start

      ctx.set('X-Response-Time', elapsed)
    })
  }
}
