import assert from 'assert'
import sinon from 'sinon'
import LoggerInterface from '../../../../main/logger/logger-interface'
import EventEmitter from 'events'
import ServerExitListener from '../../../../main/cluster/leader/server-exit-listener'

class Logger extends LoggerInterface {}

describe('server-exit-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.serverExitListener = new ServerExitListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to cluster event', function () {
    this.logger.debug = this.sandbox.spy()
    var listenerSpy = this.sandbox.spy()

    this.serverExitListener.listen(listenerSpy)
    this.emitter.emit('exit', 1, 1)

    assert.ok(this.logger.debug.called)
    assert.ok(listenerSpy.calledOnce)
    assert.ok(listenerSpy.calledWithExactly(1, 1))
  })
})
