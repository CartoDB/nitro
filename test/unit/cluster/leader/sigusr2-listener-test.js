'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require(__lib + 'logger/logger-interface')
const Sigusr2Listener = require(__lib + 'cluster/leader/sigusr2-listener')

class Logger extends LoggerInterface {}

describe('sigusr2-listener', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigusr2Listener = new Sigusr2Listener(this.emitter, this.logger)
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGUSR2 process event', () => {
    this.logger.debug = this.sandbox.spy()
    var listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sigusr2Listener.listen(listenerStub)
    this.emitter.emit('SIGUSR2')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerStub.calledOnce)
  })
})
