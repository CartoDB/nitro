'use strict'

const assert = require('assert')
const Nitro = require(__lib + 'nitro')
const Role = require(__lib + 'cluster/role')

describe('nitro', () => {
  beforeEach(() => {
    this.nitro = new Nitro()
  })

  it('.run() should init the service', () => {
    return this.nitro.run()
      .then(() => this.nitro.close())
  })

  it('.close() should close the service', () => {
    return this.nitro.run()
      .then(() => this.nitro.close())
  })

  it(`.role should return ${Role.SERVER}`, () => {
    assert.equal(this.nitro.role, Role.SERVER)
  })

  it('.logger should return a logger provider', () => {
    assert.doesNotThrow(() => this.nitro.logger.debug())
    assert.doesNotThrow(() => this.nitro.logger.info())
    assert.doesNotThrow(() => this.nitro.logger.warn())
    assert.doesNotThrow(() => this.nitro.logger.error())
  })

  it('.metrics should return a metrics instance', () => {
    assert.doesNotThrow(() => this.nitro.metrics.timing())
    assert.doesNotThrow(() => this.nitro.metrics.gauge())
    assert.doesNotThrow(() => this.nitro.metrics.increment())
  })
})
