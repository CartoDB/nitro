import ListenerAbstract from '../../listener-abstract'

export default class ServerExitListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'exit'
  }

  listen (run) {
    const exitListener = (server, code) => {
      this.logger.debug('exit signal (EXIT) received')
      return run(server, code)
    }

    this.handler = exitListener
    super.listen()
  }
}
