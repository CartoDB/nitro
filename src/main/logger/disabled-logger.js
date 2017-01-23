import LoggerInterface from './logger-interface'

export default class DisabledLogger extends LoggerInterface {
  constructor (providerDisabled = false) {
    super()

    if (!providerDisabled) {
      this.provider = new DisabledLogger(!providerDisabled)
    }
  }

  reopenFileStreams () {}

  child () {}

  debug () {}

  log () {}

  info () {}

  warn () {}

  error () {}
}
