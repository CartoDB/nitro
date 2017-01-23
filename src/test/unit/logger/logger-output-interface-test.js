import assert from 'assert'
import LoggerOutputInterface from '../../../main/logger/logger-output-interface'

class LoggerOutput extends LoggerOutputInterface {}

describe('logger-output-interface', function () {
  beforeEach(function () {
    this.loggerOutputInterface = new LoggerOutput()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new LoggerOutputInterface(), 'LoggerOutputInterface cannot be directly constructed')
  })

  it('.isAvailable() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerOutputInterface.isAvailable(), 'Unimplemented method')
  })
})
