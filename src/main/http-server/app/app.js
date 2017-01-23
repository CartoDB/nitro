import ListenerInterface from '../../listener-interface'

export default class App extends ListenerInterface {
  constructor (app, middlewares) {
    super()
    this.provider = app

    middlewares.regist(this.provider)
  }

  listen () {
    return this.provider.listen(...arguments)
  }
}
