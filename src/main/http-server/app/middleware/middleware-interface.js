import ErrorMessage from '../../../utils/error-message'

export default class MiddlewareInterface {
  constructor () {
    if (new.target === MiddlewareInterface) {
      throw new Error(ErrorMessage.cannotConstructed(MiddlewareInterface.name))
    }
  }

  regist () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  middleware () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
