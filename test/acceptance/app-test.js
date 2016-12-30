'use strict'

const assert = require('assert')
const fetch = require('node-fetch')
const HelloWorld = require(__example + 'hello-world')

describe('nitro', () => {
  before(() => {
    this.sut = new HelloWorld({ port: 0 })
  })

  beforeEach(() => {
    return this.sut.nitro.run()
      .then(httpServer => {
        this.port = httpServer.address().port
      })
  })

  afterEach(() => this.sut.nitro.close())

  it('\'/\' should response 200 ok', () => {
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
