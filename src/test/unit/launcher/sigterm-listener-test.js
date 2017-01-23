import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../main/logger/logger-interface'
import SigtermListener from '../../../main/launcher/sigterm-listener'

class Logger extends LoggerInterface {}

describe('sigterm-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigtermListener = new SigtermListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGTERM process event', function () {
    this.logger.debug = this.sandbox.spy()
    const listenerSpy = this.sandbox.spy()

    this.sigtermListener.listen(listenerSpy)
    this.emitter.emit('SIGTERM')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerSpy.calledOnce)
  })
})
