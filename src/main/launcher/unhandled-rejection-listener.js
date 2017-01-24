import ListenerAbstract from '../listener-abstract'

export default class UnhandledRejectionListener extends ListenerAbstract {
  constructor (emitter, logger) {
    super(emitter, logger)
    this.event = 'unhandledRejection'
  }

  listen () {
    const unhandledRejectionListener = (reason, promise) => {
      promise.catch(err => this.logger.error('Unhandled promise rejection:', err))
    }

    this.handler = unhandledRejectionListener
    super.listen()
  }
}
