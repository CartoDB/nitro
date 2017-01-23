import assert from 'assert'
import LoggerInterface from '../../../main/logger/logger-interface'

class Logger extends LoggerInterface {}

describe('logger-interface', function () {
  beforeEach(function () {
    this.loggerInterface = new Logger()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new LoggerInterface(), 'LoggerInterface cannot be directly constructed')
  })

  it('.debug() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.debug(), 'Unimplemented method')
  })

  it('.log() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.log(), 'Unimplemented method')
  })

  it('.info() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.info(), 'Unimplemented method')
  })

  it('.warn() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.warn(), 'Unimplemented method')
  })

  it('.error() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.error(), 'Unimplemented method')
  })
})
