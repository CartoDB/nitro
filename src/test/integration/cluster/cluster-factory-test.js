import assert from 'assert'
import options from '../../../main/config/defaults'
import LoggerFactory from '../../../main/logger/logger-factory'
import MetricsFactory from '../../../main/metrics/metrics-factory'
import RunnerInterface from '../../../main/runner-interface'
import ClusterFactory from '../../../main/cluster/cluster-factory'

describe('cluster-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const cluster = ClusterFactory.create(metrics, logger, options)

    assert.ok(cluster instanceof RunnerInterface)
  })
})
