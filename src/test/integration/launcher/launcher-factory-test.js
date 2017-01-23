import assert from 'assert'
import options from '../../../main/config/defaults'
import RunnerInterface from '../../../main/runner-interface'
import LoggerFactory from '../../../main/logger/logger-factory'
import MetricsFactory from '../../../main/metrics/metrics-factory'
import LauncherFactory from '../../../main/launcher/launcher-factory'

describe('launcher-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create(options)
    const metrics = MetricsFactory.create(logger, options)
    const launcher = LauncherFactory.create(metrics, logger, options)

    assert.ok(launcher instanceof RunnerInterface)
  })
})
