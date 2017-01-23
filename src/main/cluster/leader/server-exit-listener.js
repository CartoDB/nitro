import Listener from '../../listener'

export default class ServerExitListener extends Listener {
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
