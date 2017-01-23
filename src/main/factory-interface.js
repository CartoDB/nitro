import ErrorMessage from './utils/error-message'

export default class FactoryInterface {
  constructor () {
    if (new.target === FactoryInterface) {
      throw new Error(ErrorMessage.cannotConstructed(FactoryInterface.name))
    }
  }

  static create () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
