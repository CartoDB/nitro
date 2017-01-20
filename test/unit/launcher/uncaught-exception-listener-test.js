'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const UncaughtExceptionListener = require(__lib + 'launcher/uncaught-exception-listener')

class Logger extends LoggerInterface {}

describe('uncaught-exception-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.uncaughtExceptionListener = new UncaughtExceptionListener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to uncaughtException process event', () => {
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
