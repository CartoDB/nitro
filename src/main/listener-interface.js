import ErrorMessage from './utils/error-message'

export default class ListenerInterface {
  constructor () {
    if (new.target === ListenerInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ListenerInterface.name))
    }
  }

  listen () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  remove () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
