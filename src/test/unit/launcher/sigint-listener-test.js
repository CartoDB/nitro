import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../main/logger/logger-interface'
import SigintListener from '../../../main/launcher/sigint-listener'

class Logger extends LoggerInterface {}

describe('sigint-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigintListener = new SigintListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGINT process event', function () {
    this.logger.debug = this.sandbox.spy()
    const listenerSpy = this.sandbox.spy()

    this.sigintListener.listen(listenerSpy)
    this.emitter.emit('SIGINT')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerSpy.calledOnce)
  })
})
