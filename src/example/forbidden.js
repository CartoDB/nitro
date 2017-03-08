import { SERVER } from '../'
import Example from './example'

export default class Forbidden extends Example {
  constructor (options) {
    super(options)

    if (this.nitro.role === SERVER) {
      this.nitro.app.use(ctx => {
        ctx.throw(403)
      })
    }
  }
}
