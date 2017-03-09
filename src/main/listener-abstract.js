import ListenerInterface from './listener-interface'
import { AbstractClassError } from './errors/errors'

export default class ListenerAbstract extends ListenerInterface {
  constructor (emitter, logger) {
    if (new.target === ListenerAbstract) {
      throw new AbstractClassError(ListenerAbstract.name)
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
