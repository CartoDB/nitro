import assert from 'assert'
import sinon from 'sinon'
import RunnerInterface from '../../../main/runner-interface'
import ListenerInterface from '../../../main/listener-interface'
import Launcher from '../../../main/launcher/launcher'

class Runner extends RunnerInterface {}
class Listeners extends ListenerInterface {}

describe('launcher', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    this.runner = new Runner()
    this.listeners = new Listeners()
    this.sandbox.stub(this.listeners, 'listen')

    this.launcher = new Launcher(this.runner, this.listeners)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be a runner instance', function () {
    assert.ok(this.launcher instanceof RunnerInterface)
  })

  it('.run() should launch worker successfully', function () {
    var targetRunStub = this.sandbox.stub(this.runner, 'run').returns(Promise.resolve())

    return this.launcher.run()
      .then(() => {
        assert.ok(targetRunStub.calledOnce)
      })
  })

  it('.exit() should exit worker successfully', function () {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit()
      .then(() => {
        assert.ok(targetExitStub.calledWithExactly)
      })
  })

  it('.exit(1) should exit worker with error', function () {
    var targetExitStub = this.sandbox.stub(this.runner, 'exit').returns(Promise.resolve())

    return this.launcher.exit(1)
      .then(() => {
        assert.ok(targetExitStub.calledWithExactly(1))
      })
  })
})
