'use strict'

const Nitro = require('../')
const Router = require('koa-router')

class HelloWorld {
  constructor (options) {
    this.nitro = new Nitro(options)

    if (this.nitro.app) {
      const router = Router()
      const body = new Buffer('Hello World')
      const message = body.toString('utf8')

      router.get('/', async (ctx) => {
        ctx.log.info(message)
        ctx.metrics.increment('hello_world')
        ctx.set('content-type', 'text/html')
        ctx.body = body
      })

      this.nitro.app.use(router.routes())
    }
  }

  run () {
    return this.nitro.run()
  }
}

module.exports = HelloWorld
