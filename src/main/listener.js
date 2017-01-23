import ListenerInterface from './listener-interface'
import ErrorMessage from './utils/error-message'

export default class Listener extends ListenerInterface {
  constructor (emitter, logger) {
    if (new.target === Listener) {
      throw new Error(ErrorMessage.cannotConstructed(Listener.name))
    }

    super()
    this.emitter = emitter
    this.logger = logger
  }

  listen () {
    this.logger.debug(`${this.handler.name} attached to ${this.event} event`)
    this.emitter.on(this.event, this.handler)
  }

  remove () {
    this.logger.debug(`${this.handler.name} dettached from ${this.event} event`)
    this.emitter.removeListener(this.event, this.handler)
  }
}
