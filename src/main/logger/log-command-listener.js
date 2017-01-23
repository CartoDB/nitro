import Listener from '../listener'

export default class LogCommandListener extends Listener {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'message'
    this.command = 'logger:reopen-file-streams'
  }

  listen (reopenFileStreams) {
    const reopenFileStreamsListener = command => command === this.command
        ? reopenFileStreams()
        : undefined

    this.handler = reopenFileStreamsListener
    super.listen()
  }
}
