import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../main/logger/logger-interface'
import UncaughtExceptionListener from '../../../main/launcher/uncaught-exception-listener'

class Logger extends LoggerInterface {}

describe('uncaught-exception-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.uncaughtExceptionListener = new UncaughtExceptionListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to uncaughtException process event', function () {
    this.logger.debug = this.sandbox.spy()
    this.logger.error = this.sandbox.spy()
    const exitSpy = this.sandbox.spy()

    this.uncaughtExceptionListener.listen(exitSpy)
    this.emitter.emit('uncaughtException', new Error('Irrelevant error'))

    assert.ok(this.logger.debug.calledOnce)
    assert.ok(this.logger.error.calledOnce)
    assert.ok(exitSpy.withArgs(1).calledOnce)
  })
})
