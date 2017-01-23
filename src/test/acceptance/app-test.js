import assert from 'assert'
import fetch from 'node-fetch'
import HelloWorld from '../../example/hello-world'

describe('end-to-end app examples', function () {
  before(function () {
    this.sut = new HelloWorld({ port: 0 })
  })

  beforeEach(function () {
    return this.sut.nitro.run()
      .then(httpServer => {
        this.port = httpServer.address().port
      })
  })

  afterEach(function () {
    this.sut.nitro.close()
  })

  it('\'/\' should response 200 ok', function () {
    return fetch(`http://localhost:${this.port}/`)
      .then(res => {
        assert.ok(res.ok)
        assert.equal(res.status, 200)
        assert.equal(res.headers.get('content-type'), 'text/html')

        return res.text()
      })
      .then(body => {
        assert.equal(body, 'Hello World')
      })
  })
})
