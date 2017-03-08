import MiddlewareInterface from './middleware-interface'

export default class Middleware extends MiddlewareInterface {
  constructor (options = {}) {
    super()
    this.name = new.target.name
  }

  regist (app) {
    const middleware = this.middleware()
    middleware._name = this.name // debugging purposes
    app.use(middleware)
  }
}
