import assert from 'assert'
import DisabledMetrics from '../../../main/metrics/disabled-metrics'

describe('logger', function () {
  beforeEach(function () {
    this.metrics = new DisabledMetrics()
  })

  it('.timing() should do nothing', function () {
    assert.doesNotThrow(() => this.metrics.timing())
  })

  it('.gauge() should do nothing', function () {
    assert.doesNotThrow(() => this.metrics.gauge())
  })

  it('.logOnError() should do nothing', function () {
    assert.doesNotThrow(() => this.metrics.logOnError())
  })

  it('.gaugeMemory() should  do nothing', function () {
    assert.doesNotThrow(() => this.metrics.gaugeMemory())
  })

  it('.increment() should  do nothing', function () {
    assert.doesNotThrow(() => this.metrics.increment())
  })
})
