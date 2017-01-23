import assert from 'assert'
import DisabledLogger from '../../../main/logger/disabled-logger'

describe('logger', function () {
  beforeEach(function () {
    this.logger = new DisabledLogger()
  })

  it('.child() should do nothing', function () {
    assert.doesNotThrow(() => this.logger.child())
  })

  it('.reopenFileStreams() should do nothing', function () {
    assert.doesNotThrow(() => this.logger.reopenFileStreams())
  })

  it('.debug() should do nothing', function () {
    assert.doesNotThrow(() => this.logger.debug())
  })

  it('.log() should  do nothing', function () {
    assert.doesNotThrow(() => this.logger.log())
  })

  it('.info() should  do nothing', function () {
    assert.doesNotThrow(() => this.logger.info())
  })

  it('.warn() should do nothing', function () {
    assert.doesNotThrow(() => this.logger.warn())
  })

  it('.error() should do nothing', function () {
    assert.doesNotThrow(() => this.logger.error())
  })
})
