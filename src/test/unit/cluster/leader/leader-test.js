import assert from 'assert'
import sinon from 'sinon'
import os from 'os'
import EventEmitter from 'events'
import LoggerInterface from '../../../../main/logger/logger-interface'
import ListenerInterface from '../../../../main/listener-interface'
import ServerManager from '../../../../main/cluster/leader/server-manager'
import Leader from '../../../../main/cluster/leader/leader'

class Logger extends LoggerInterface {}
class Sigusr2Listener extends ListenerInterface {}
class ServerExitListener extends ListenerInterface {}
class SighupListener extends ListenerInterface {}

class Cluster extends EventEmitter {
  fork () {}
}

describe('leader', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.logger = new Logger()

    this.cluster = new Cluster()

    this.serverExitListener = new ServerExitListener()
    this.serverExitListener.listen = this.sandbox.spy()
    this.serverExitListener.remove = this.sandbox.spy()

    this.sigusr2Listener = new Sigusr2Listener()
    this.sigusr2Listener.listen = this.sandbox.spy()
    this.sigusr2Listener.remove = this.sandbox.spy()

    this.sighupListener = new SighupListener()
    this.sighupListener.listen = this.sandbox.spy()
    this.sighupListener.remove = this.sandbox.spy()

    this.serverManager = new ServerManager(
      this.cluster,
      this.sigusr2Listener,
      this.serverExitListener,
      this.sighupListener,
      this.logger
    )

    this.leader = new Leader(this.serverManager, this.logger)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.run() should create as many workers as CPUs there are in the machine', async function () {
    this.logger.info = this.sandbox.spy()
    const serverManagerForkStub = this.sandbox.stub(this.serverManager, 'fork').returns(undefined)

    await this.leader.run()
    assert.ok(this.logger.info.calledOnce)
    assert.equal(serverManagerForkStub.callCount, os.cpus().length)
  })

  it('.exit() should exit successfully', function () {
    this.logger.debug = this.sandbox.spy()
    const processExitStup = this.sandbox.stub(process, 'exit').returns(undefined)

    this.leader.exit(0)

    assert.ok(this.logger.debug.called)
    assert.ok(processExitStup.calledWithExactly(0))
  })

  it('.exit(1) should stop server and exit succesfully with error', function () {
    this.logger.debug = this.sandbox.spy()
    const processExitStup = this.sandbox.stub(process, 'exit').returns(undefined)

    this.leader.exit(1)

    assert.ok(this.logger.debug.called)
    assert.ok(processExitStup.calledWithExactly(1))
  })
})
