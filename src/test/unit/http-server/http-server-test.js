import assert from 'assert'
import sinon from 'sinon'
import ListenerInterface from '../../../main/listener-interface'
import RunnerInterface from '../../../main/runner-interface'
import LoggerInterface from '../../../main/logger/logger-interface'
import HttpServer from '../../../main/http-server/http-server'
import EventEmitter from 'events'

class Listener extends ListenerInterface {}
class Logger extends LoggerInterface {}

describe('server', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    this.port = 9876
    this.app = new Listener()
    this.logger = new Logger()
    this.httpServer = new HttpServer(this.app, this.port, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be a runner instance', function () {
    assert.ok(this.httpServer instanceof RunnerInterface)
  })

  it('.run() should listen on specific port successfully', function () {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)
    this.logger.info = this.sandbox.spy()

    setTimeout(function () {
      httpServerStub.emit('listening')
    }, 10)
    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        assert.ok(this.logger.info.calledOnce)
      })
  })

  it('.run() should fail when app listening fails', function () {
    var httpServerStub = new EventEmitter()
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)

    setTimeout(function () {
      httpServerStub.emit('error')
    }, 10)

    return this.httpServer.run()
      .catch(function () {
        assert.ok(appRunStub.calledOnce)
      })
  })

  it('.run() should fail when app is not redy', function () {
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(null)

    return this.httpServer.run()
      .catch(function () {
        assert.ok(appRunStub.calledOnce)
      })
  })

  it('.close() should stop even though http-server is not listening', function () {
    return this.httpServer.close()
  })

  it('.close() should stop successfully when http-server is listening', function () {
    var httpServer = new EventEmitter()
    httpServer.close = function () {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    this.logger.info = this.sandbox.spy()

    setTimeout(() => httpServer.emit('listening'), 2)

    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        setTimeout(() => httpServer.emit('close'), 2)
        return this.httpServer.close()
      })
      .then(() => {
        assert.ok(httpServerStub.calledOnce)
        assert.ok(this.logger.info.calledTwice)
      })
  })

  it('.close() should fail when http-server also fails', function () {
    var httpServer = new EventEmitter()
    httpServer.close = function () {}
    var httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    var appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)
    this.logger.info = this.sandbox.spy()

    setTimeout(() => httpServer.emit('listening'), 2)
    return this.httpServer.run()
      .then(() => {
        assert.ok(appRunStub.calledOnce)
        setTimeout(() => httpServer.emit('error', new Error('irrelevant')), 2)
        return this.httpServer.close()
      })
      .catch(err => {
        assert.equal(err.message, 'irrelevant')
        assert.ok(httpServerStub.calledOnce)
        assert.ok(this.logger.info.calledOnce)
      })
  })
})
