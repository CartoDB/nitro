import MiddlewareInterface from './middleware-interface'
import { ParentClassError } from '../../../errors/errors'

export default class AppMiddlewares extends Set {
  add (middleware) {
    if (!(middleware instanceof MiddlewareInterface)) {
      throw new ParentClassError(middleware.constructor.name, MiddlewareInterface.name)
    }

    super.add(middleware)

    return this
  }

  regist (app) {
    for (let middleware of this) {
      middleware.regist(app)
    }
  }
}
