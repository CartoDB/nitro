import assert from 'assert'
import sinon from 'sinon'
import LoggerInterface from '../../../main/logger/logger-interface'
import ListenerInterface from '../../../main/listener-interface'
import Logger from '../../../main/logger/logger'

class LoggerProvider extends LoggerInterface {}
class SighupListener extends ListenerInterface {}

describe('logger', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    this.provider = new LoggerProvider()
    this.sighupListener = new SighupListener()
    this.sighupListenerListenStub = this.sandbox.stub(this.sighupListener, 'listen')
    this.logger = new Logger(this.provider, this.sighupListener)
  })

  afterEach(function () {
    assert.ok(this.sighupListenerListenStub.calledOnce)
    this.sandbox.restore()
  })

  it('.debug() should log at debug level', function () {
    this.provider.debug = this.sandbox.spy()
    const args = [ 'debug', 'wadus message' ]

    this.logger.debug(...args)

    assert.ok(this.provider.debug.calledWithExactly(...args))
  })

  it('.log() should log', function () {
    this.provider.info = this.sandbox.spy()
    const args = [ 'info', 'wadus message' ]

    this.logger.log(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.info() should log at info level', function () {
    this.provider.info = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.info(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.warn() should log at warn level', function () {
    this.provider.warn = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.warn(...args)

    assert.ok(this.provider.warn.calledWithExactly(...args))
  })

  it('.error() should log at error level', function () {
    this.provider.error = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.error(...args)

    assert.ok(this.provider.error.calledWithExactly(...args))
  })
})
