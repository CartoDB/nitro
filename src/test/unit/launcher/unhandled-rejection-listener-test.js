import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../main/logger/logger-interface'
import UnhandledRejectionListener from '../../../main/launcher/unhandled-rejection-listener'

class Logger extends LoggerInterface {}

describe('unhandled-rejection-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.emitter = new EventEmitter()
    this.logger = new Logger()
    this.unhandledRejectionListener = new UnhandledRejectionListener(this.emitter, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to uncaughtException process event', function (done) {
    this.logger.error = this.sandbox.spy()
    this.logger.debug = this.sandbox.spy()

    var error = new Error('Irrelevant error')
    var rejectedPromise = Promise.reject(error)

    this.unhandledRejectionListener.listen()
    this.emitter.emit('unhandledRejection', error, rejectedPromise)

    process.nextTick(function () {
      assert.ok(this.logger.error.calledOnce)
      assert.ok(this.logger.debug.calledOnce)

      process.removeAllListeners('unhandledRejection')
      done()
    }.bind(this))
  })
})
