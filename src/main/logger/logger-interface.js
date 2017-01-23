import ErrorMessage from '../utils/error-message'

export default class LoggerInterface {
  constructor () {
    if (new.target === LoggerInterface) {
      throw new Error(ErrorMessage.cannotConstructed(LoggerInterface.name))
    }
  }

  debug () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  log () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  info () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  warn () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  error () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
