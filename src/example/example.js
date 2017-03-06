import Nitro from '../'

export default class Example {
  constructor (options) {
    this.nitro = new Nitro(options)
  }

  start () {
    return this.nitro.start()
  }

  stop () {
    return this.nitro.stop()
  }
}
