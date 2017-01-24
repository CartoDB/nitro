import ListenerAbstract from '../listener-abstract'

export default class SighupListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'SIGHUP'
  }

  listen (reopenFileStreams) {
    const sighupListener = () => reopenFileStreams()

    this.handler = sighupListener
    super.listen()
  }
}
