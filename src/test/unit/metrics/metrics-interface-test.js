import assert from 'assert'
import MetricsInterface from '../../../main/metrics/metrics-interface'

class Metrics extends MetricsInterface {}

describe('metrics-interface', function () {
  beforeEach(function () {
    this.metrics = new Metrics()
  })
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new MetricsInterface(), 'MetricsInterface cannot be directly constructed')
  })

  it('.timing() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.timing(), 'Unimplemented method')
  })

  it('.gauge() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.gauge(), 'Unimplemented method')
  })

  it('.logOnError() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.logOnError(), 'Unimplemented method')
  })

  it('.gaugeMemory() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.gaugeMemory(), 'Unimplemented method')
  })

  it('.increment() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.increment(), 'Unimplemented method')
  })
})
