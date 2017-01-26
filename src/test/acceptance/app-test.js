import assert from 'assert'
import fetch from 'node-fetch'
import HelloWorld from '../../example/hello-world'

describe('end-to-end app examples', function () {
  before(function () {
    this.sut = new HelloWorld({ port: 0 })
  })

  beforeEach(async function () {
    const httpServer = await this.sut.nitro.run()
    this.port = httpServer.address().port
  })

  afterEach(function () {
    this.sut.nitro.close()
  })

  it('\'/\' should response 200 ok', async function () {
    const res = await fetch(`http://localhost:${this.port}/`)
    assert.ok(res.ok)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('content-type'), 'text/html')

    const body = await res.text()
    assert.equal(body, 'Hello World')
  })
})
