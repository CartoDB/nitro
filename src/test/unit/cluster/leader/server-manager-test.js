import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import LoggerInterface from '../../../../main/logger/logger-interface'
import ListenerInterface from '../../../../main/listener-interface'
import ServerManager from '../../../../main/cluster/leader/server-manager'

class Logger extends LoggerInterface {}
class Sigusr2Listener extends ListenerInterface {}
class ServerExitListener extends ListenerInterface {}
class SighupListener extends ListenerInterface {}
class Cluster extends EventEmitter {
  fork () {}
}

describe('server-manager', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.cluster = new Cluster()
    this.logger = new Logger()

    this.sigusr2Listener = new Sigusr2Listener()
    this.sigusr2Listener.listen = this.sandbox.spy()

    this.serverExitListener = new ServerExitListener()
    this.serverExitListener.listen = this.sandbox.spy()

    this.sighupListener = new SighupListener()
    this.sighupListener.listen = this.sandbox.spy()

    this.serverManager = new ServerManager(
      this.cluster,
      this.sigusr2Listener,
      this.serverExitListener,
      this.sighupListener,
      this.logger
    )
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.fork() should create a new worker', function () {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var forkStub = this.sandbox.stub(this.cluster, 'fork')

    this.serverManager.fork()

    assert.ok(forkStub.calledOnce)
    assert.ok(loggerInfoStub.calledOnce)
  })

  it('.refork() should create a new worker if the previous one crashed', function () {
    var serverManagerForkStub = this.sandbox.stub(this.serverManager, 'fork')
    var serverStub = {
      exitedAfterDisconnect: false,
      process: {
        pid: 1
      }
    }

    this.serverManager.refork(serverStub, 1)

    assert.ok(serverManagerForkStub.calledOnce)
  })

  it('.refork() should not create a new worker if the previous one made away with itself', function () {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var serverManagerForkStub = this.sandbox.stub(this.serverManager, 'fork')
    var serverStub = {
      exitedAfterDisconnect: true,
      process: {
        pid: 1
      }
    }

    this.serverManager.refork(serverStub, 1)

    assert.ok(!loggerInfoStub.calledOnce)
    assert.ok(!serverManagerForkStub.calledOnce)
  })

  it('.refork() should not create a new worker if the previous one exited', function () {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    var serverManagerForkStub = this.sandbox.stub(this.serverManager, 'fork')
    var serverStub = {
      exitedAfterDisconnect: true,
      process: {
        pid: 1
      }
    }

    this.serverManager.refork(serverStub, 0)

    assert.ok(!loggerInfoStub.calledOnce)
    assert.ok(!serverManagerForkStub.calledOnce)
  })

  it('.reloadAllServers() should restart all workers', function () {
    var loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    this.cluster.workers = {
      '1': {},
      '2': {}
    }

    var serverManagerReloadStub = this.sandbox.stub(this.serverManager, 'reloadServer')
    serverManagerReloadStub.returns(Promise.resolve())

    return this.serverManager.reloadAllServers()
      .then(() => {
        assert.ok(loggerInfoStub.calledOnce)
        assert.ok(!serverManagerReloadStub.calledOnce)
      })
  })

  it('.reloadServer() should restart one worker', function () {
    var newServerFake = new EventEmitter()
    this.serverManager.fork = function () {
      return newServerFake
    }

    var serverFake = new EventEmitter()
    serverFake.exitedAfterDisconnect = true
    serverFake.disconnect = function () {
      process.nextTick(function () {
        serverFake.emit('exit')
        newServerFake.emit('listening')
      })
    }
    this.cluster.workers = {
      '1': serverFake
    }

    return this.serverManager.reloadServer('1')
  })

  it('.reloadServer() should fail due to worker did not fork successfully', function () {
    var newServerFake = new EventEmitter()
    this.serverManager.fork = function () {
      return newServerFake
    }

    var serverFake = new EventEmitter()
    serverFake.exitedAfterDisconnect = true
    serverFake.disconnect = function () {
      process.nextTick(function () {
        serverFake.emit('exit')
        newServerFake.emit('error', new Error('Irrelevant error'))
      })
    }
    this.cluster.workers = {
      '1': serverFake
    }

    return this.serverManager.reloadServer('1')
      .catch((err) => {
        assert.equal(err.message, 'Irrelevant error')
      })
  })

  it('.reloadServer() should fail due to worker did not make away with itself', function () {
    var serverFake = new EventEmitter()
    serverFake.exitedAfterDisconnect = false
    serverFake.disconnect = function () {
      process.nextTick(function () {
        serverFake.emit('exit')
      })
    }
    this.cluster.workers = {
      '1': serverFake
    }

    return this.serverManager.reloadServer('1')
      .catch(err => assert.equal(err.message, 'Server exited accidentaly'))
  })
})
