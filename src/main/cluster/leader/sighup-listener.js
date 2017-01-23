import Listener from '../../listener'

export default class SighupListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGHUP'
  }

  listen (reopenAllLogFileStreams) {
    const sighupListener = () => {
      this.logger.debug('signal hang up (SIGHUP) received')
      return reopenAllLogFileStreams()
    }

    this.handler = sighupListener
    super.listen()
  }
}