'use strict'

const Listener = require('../listener')

class SighupListener extends Listener {
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

module.exports = SighupListener
