import assert from 'assert'
import Nitro from '../../main/nitro'
import Role from '../../main/cluster/role'

describe('nitro', function () {
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
  })
})
