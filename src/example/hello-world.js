import Nitro from '../'

export default class HelloWorld {
  constructor (options) {
    this.nitro = new Nitro(options)

    if (this.nitro.app) {
      const body = new Buffer('Hello World\n')
      const message = body.toString('utf8')

      this.nitro.app.use(ctx => {
        ctx.log.info(message)
        ctx.metrics.increment('hello_world')
        ctx.set('content-type', 'text/html')
        ctx.body = body
      })
    }
  }

  run () {
    return this.nitro.run()
  }

  close () {
    return this.nitro.close()
  }
}
