import assert from 'assert'
import options from '../../../../main/config/defaults'
import LoggerFactory from '../../../../main/logger/logger-factory'
import MetricsFactory from '../../../../main/metrics/metrics-factory'
import RunnerInterface from '../../../../main/runner-interface'
import ServerFactory from '../../../../main/cluster/server/server-factory'

describe('server-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const server = ServerFactory.create(metrics, logger, options)

    assert.ok(server instanceof RunnerInterface)
  })
})
