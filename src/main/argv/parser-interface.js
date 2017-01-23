import ErrorMessage from '../utils/error-message'

export default class ParserInterface {
  constructor () {
    if (new.target === ParserInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ParserInterface.name))
    }
  }

  parse () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
