import assert from 'assert'
import RunnerInterface from '../../main/runner-interface'

class Runner extends RunnerInterface {}

describe('runner-interface', function () {
  beforeEach(function () {
    this.runnerInterface = new Runner()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new RunnerInterface(), 'RunnerInterface cannot be directly constructed')
  })

  it('.run() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.runnerInterface.run(), 'Unimplemented method')
  })

  it('.close() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.runnerInterface.close(), 'Unimplemented method')
  })

  it('.exit() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.runnerInterface.exit(), 'Unimplemented method')
  })
})
