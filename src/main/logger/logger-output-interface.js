import { AbstractClassError, UnimplementedError } from '../errors/errors'

export default class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new AbstractClassError(LoggerOutputInterface.name)
    }
  }

  isAvailable () {
    throw new UnimplementedError()
  }
}
