import { SERVER } from '../'
import Example from './example'

export default class HelloWorld extends Example {
  constructor (options) {
    super(options)

    if (this.nitro.role === SERVER) {
      const body = new Buffer('Hello World\n')
      const message = body.toString('utf8')

      this.nitro.app.use(ctx => {
        ctx.log.info(message)
        ctx.metrics.increment('hello_world')
        ctx.body = body
      })
    }
  }
}
