import ListenerAbstract from '../../listener-abstract'

export default class Sigusr2Listener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGUSR2'
  }

  listen (reloadAllServers) {
    const sigusr2Listener = () => {
      this.logger.debug('signal user (SIGUSR2) received')
      return reloadAllServers()
    }

    this.handler = sigusr2Listener
    super.listen()
  }
}
