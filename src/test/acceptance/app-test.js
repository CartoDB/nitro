import assert from 'assert'
import fetch from 'node-fetch'
import HelloWorld from '../../example/hello-world'

describe('end-to-end app examples', function () {
  before(function () {
    this.app = new HelloWorld({ port: 0 })
  })

  beforeEach(async function () {
    const httpServer = await this.app.run()
    this.port = httpServer.address().port
  })

  afterEach(function () {
    this.app.close()
  })

  it('GET / should response 200 ok', async function () {
    const res = await fetch(`http://localhost:${this.port}/`)
    const body = await res.text()

    assert.ok(res.ok)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('content-type'), 'text/html')

    assert.equal(body, 'Hello World')
  })

  it('GET / should response 200 ok', async function () {
    const res = await fetch(`http://localhost:${this.port}/`, {
      headers: { 'x-request-id': 'wadus' }
    })
    const body = await res.text()

    assert.ok(res.ok)
    assert.equal(res.status, 200)
    assert.equal(res.headers.get('x-request-id'), 'wadus')

    assert.equal(body, 'Hello World')
  })
})
