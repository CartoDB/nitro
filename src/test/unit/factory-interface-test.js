import assert from 'assert'
import FactoryInterface from '../../main/factory-interface'

describe('factory-interface', function () {
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new FactoryInterface(), 'FactoryInterface cannot be directly constructed')
  })

  it('.create() should throw "Unimplemented method" error', function () {
    assert.throws(() => FactoryInterface.create(), 'Unimplemented method')
  })
})
