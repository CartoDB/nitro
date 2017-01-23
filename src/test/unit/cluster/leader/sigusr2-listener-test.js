import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../../main/logger/logger-interface'
import Sigusr2Listener from '../../../../main/cluster/leader/sigusr2-listener'

class Logger extends LoggerInterface {}

describe('sigusr2-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sigusr2Listener = new Sigusr2Listener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGUSR2 process event', function () {
    this.logger.debug = this.sandbox.spy()
    var listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sigusr2Listener.listen(listenerStub)
    this.emitter.emit('SIGUSR2')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerStub.calledOnce)
  })
})
