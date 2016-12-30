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

  it(`.role() should return ${Role.SERVER}`, () => {
    assert.equal(this.nitro.role, Role.SERVER)
  })
})
