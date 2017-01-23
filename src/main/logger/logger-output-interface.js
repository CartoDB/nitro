import ErrorMessage from '../utils/error-message'

export default class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new Error(ErrorMessage.cannotConstructed(LoggerOutputInterface.name))
    }
  }

  isAvailable () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}