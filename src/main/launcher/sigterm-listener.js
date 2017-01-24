import ListenerAbstract from '../listener-abstract'

export default class SigtermListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGTERM'
  }

  listen (exit) {
    const sigtermListener = () => {
      this.logger.debug('termination signal (SIGTERM) received')
      exit()
    }

    this.handler = sigtermListener
    super.listen()
  }
}
