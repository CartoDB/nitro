import ListenerAbstract from '../listener-abstract'

export default class SigintListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGINT'
  }

  listen (exit) {
    const sigintListener = () => {
      this.logger.debug('interrupt signal (SIGINT) received')
      exit()
    }

    this.handler = sigintListener
    super.listen()
  }
}
