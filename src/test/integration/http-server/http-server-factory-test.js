import assert from 'assert'
import options from '../../../main/config/defaults'
import RunnerInterface from '../../../main/runner-interface'
import HttpServerFactory from '../../../main/http-server/http-server-factory'
import LoggerFactory from '../../../main/logger/logger-factory'
import MetricsFactory from '../../../main/metrics/metrics-factory'

describe('http-server-factory', function () {
  it('.create() should return a HttpServer instance', function () {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const httpServer = HttpServerFactory.create(metrics, logger, options)

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
