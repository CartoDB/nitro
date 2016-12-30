'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MiddlewareInterface = require(__lib + 'http-server/app/middleware/middleware-interface')
const App = require(__lib + 'http-server/app/app')

class AppMiddlewares extends MiddlewareInterface {}

describe('app', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create()

    this.provider = {
      use: () => {},
      listen: () => {},
      disable: () => {}
    }
    this.middlewares = new AppMiddlewares()
  })

  afterEach(() => {
    this.sandbox.restore()
  })

  it('.listen() should listen on port 3000', () => {
    var appListenStub = this.sandbox.stub(this.provider, 'listen')
    var middlewaresRegistAllStub = this.sandbox.stub(this.middlewares, 'regist')

    this.app = new App(this.provider, this.middlewares)
    this.server = this.app.listen(3000)

    assert.ok(appListenStub.calledOnce)
    assert.ok(middlewaresRegistAllStub.calledOnce)
  })
})
