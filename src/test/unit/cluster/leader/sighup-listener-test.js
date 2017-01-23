import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../../main/logger/logger-interface'
import SighupListener from '../../../../main/cluster/leader/sighup-listener'

class Logger extends LoggerInterface {}

describe('sigterm-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.sighupListener = new SighupListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGTERM process event', function () {
    this.logger.debug = this.sandbox.spy()
    const listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sighupListener.listen(listenerStub)
    this.emitter.emit('SIGHUP')

    assert.ok(this.logger.debug.called)
    assert.ok(listenerStub.calledOnce)
  })
})
