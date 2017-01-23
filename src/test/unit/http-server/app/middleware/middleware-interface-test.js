import assert from 'assert'
import MiddlewareInterface from '../../../../../main/http-server/app/middleware/middleware-interface'

class Middleware extends MiddlewareInterface {}

describe('metrics-interface', function () {
  beforeEach(function () {
    this.middleware = new Middleware()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new MiddlewareInterface(), 'MiddlewareInterface cannot be directly constructed')
  })

  it('.regist() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.middleware.regist(), 'Unimplemented method')
  })
})
