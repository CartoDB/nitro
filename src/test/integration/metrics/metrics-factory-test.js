import assert from 'assert'
import defaults from '../../../main/config/defaults'
import LoggerFactory from '../../../main/logger/logger-factory'
import MetricsInterface from '../../../main/metrics/metrics-interface'
import MetricsFactory from '../../../main/metrics/metrics-factory'

describe('metrics-factory', function () {
  it('.create() should return a Metrics instance', function () {
    const logger = LoggerFactory.create(defaults)

    const metrics = MetricsFactory.create(logger, defaults)

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return a Metrics instance when disabled', function () {
    const options = Object.assign({}, defaults, {
      metrics: {
        enabled: false
      }
    })
    const logger = LoggerFactory.create(options)

    const metrics = MetricsFactory.create(logger, options)

    assert.ok(metrics instanceof MetricsInterface)
  })
})
