import MiddlewareInterface from './middleware-interface'

export default class MetricsMiddleware extends MiddlewareInterface {
  constructor (metrics) {
    super()
    this.metrics = metrics
  }

  regist (app) {
    app.use(async (ctx, next) => {
      ctx.metrics = this.metrics
      await next()
    })
  }
}
