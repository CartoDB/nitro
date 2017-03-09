import { AbstractClassError, UnimplementedError } from '../errors/errors'

export default class LoggerInterface {
  constructor () {
    if (new.target === LoggerInterface) {
      throw new AbstractClassError(LoggerInterface.name)
    }
  }

  debug () {
    throw new UnimplementedError()
  }

  log () {
    throw new UnimplementedError()
  }

  info () {
    throw new UnimplementedError()
  }

  warn () {
    throw new UnimplementedError()
  }

  error () {
    throw new UnimplementedError()
  }
}
