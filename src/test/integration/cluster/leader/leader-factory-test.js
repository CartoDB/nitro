import assert from 'assert'
import options from '../../../../main/config/defaults'
import RunnerInterface from '../../../../main/runner-interface'
import MetricsFactory from '../../../../main/metrics/metrics-factory'
import LoggerFactory from '../../../../main/logger/logger-factory'
import LeaderFactory from '../../../../main/cluster/leader/leader-factory'

describe('leader-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)

    const leader = LeaderFactory.create(metrics, logger)

    assert.ok(leader instanceof RunnerInterface)
  })
})
