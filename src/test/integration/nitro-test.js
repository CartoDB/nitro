import assert from 'assert'
import Role from '../../main/cluster/role'
import Nitro from '../../main/nitro'

describe('nitro OOP API', function () {
  beforeEach(function () {
    this.nitro = new Nitro()
  })

  it('.run() should init the service', async function () {
    assert.doesNotThrow(async () => {
      await this.nitro.run()
      await this.nitro.close()
    })
  })

  it('.close() should close the service', function () {
    assert.doesNotThrow(async () => {
      await this.nitro.run()
      await this.nitro.close()
    })
  })

  it(`.role should return ${Role.SERVER}`, function () {
    assert.equal(this.nitro.role, Role.SERVER)
  })

  it('.logger should return a logger provider', function () {
    assert.doesNotThrow(() => this.nitro.logger.debug())
    assert.doesNotThrow(() => this.nitro.logger.info())
    assert.doesNotThrow(() => this.nitro.logger.warn())
    assert.doesNotThrow(() => this.nitro.logger.error())
  })

  it('.metrics should return a metrics instance', function () {
    assert.doesNotThrow(() => this.nitro.metrics.timing())
    assert.doesNotThrow(() => this.nitro.metrics.gauge())
    assert.doesNotThrow(() => this.nitro.metrics.increment())
    assert.doesNotThrow(() => this.nitro.metrics.logOnError())
    assert.doesNotThrow(() => this.nitro.metrics.gaugeMemory())
  })
})

describe('nitro FP API', function () {
  beforeEach(function () {
    const { app, role, logger, metrics, start, stop } = new Nitro()
    this.app = app
    this.role = role
    this.logger = logger
    this.metrics = metrics
    this.start = start
    this.stop = stop
  })

  it('.run() should init the service', async function () {
    assert.doesNotThrow(async () => {
      await this.start()
      await this.stop()
    })
  })

  it('.close() should close the service', function () {
    assert.doesNotThrow(async () => {
      await this.start()
      await this.stop()
    })
  })

  it(`.role should return ${Role.SERVER}`, function () {
    assert.equal(this.role, Role.SERVER)
  })

  it('.logger should return a logger provider', function () {
    assert.doesNotThrow(() => this.logger.debug())
    assert.doesNotThrow(() => this.logger.info())
    assert.doesNotThrow(() => this.logger.warn())
    assert.doesNotThrow(() => this.logger.error())
  })

  it('.metrics should return a metrics instance', function () {
    assert.doesNotThrow(() => this.metrics.timing())
    assert.doesNotThrow(() => this.metrics.gauge())
    assert.doesNotThrow(() => this.metrics.increment())
    assert.doesNotThrow(() => this.metrics.logOnError())
    assert.doesNotThrow(() => this.metrics.gaugeMemory())
  })
})
