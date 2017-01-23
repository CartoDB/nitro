import MiddlewareInterface from './middleware-interface'
import ErrorMessage from '../../../utils/error-message'

export default class AppMiddlewares extends Set {
  add (middleware) {
    if (!(middleware instanceof MiddlewareInterface)) {
      throw new Error(ErrorMessage.mustBe(middleware.constructor.name, MiddlewareInterface.name))
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
