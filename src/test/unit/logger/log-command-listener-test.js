import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import ListenerInterface from '../../../main/listener-interface'
import LoggerInterface from '../../../main/logger/logger-interface'
import LogCommandListener from '../../../main/logger/log-command-listener'

class Logger extends LoggerInterface {}

describe('log-command-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.logCommandListener = new LogCommandListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be an instace of ListenerInterface', function () {
    assert.ok(this.logCommandListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to message process event', function () {
    this.logger.debug = this.sandbox.spy()
    const reopenFileStreamsSpy = this.sandbox.spy()

    this.logCommandListener.listen(reopenFileStreamsSpy)
    this.emitter.emit('message', 'logger:reopen-file-streams')

    assert.ok(this.logger.debug.calledOnce)
    assert.ok(reopenFileStreamsSpy.calledOnce)
  })

  it('.listen() should attach listener to message process event', function () {
    this.logger.debug = this.sandbox.spy()
    const reopenFileStreamsSpy = this.sandbox.spy()

    this.logCommandListener.listen(reopenFileStreamsSpy)
    this.emitter.emit('message', 'logger:wadus-command')

    assert.ok(this.logger.debug.calledOnce)
    assert.ok(!reopenFileStreamsSpy.called)
  })
})
