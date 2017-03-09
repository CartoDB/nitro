import { AbstractClassError, UnimplementedError } from '../errors/errors'

export default class ParserInterface {
  constructor () {
    if (new.target === ParserInterface) {
      throw new AbstractClassError(ParserInterface.name)
    }
  }

  parse () {
    throw new UnimplementedError()
  }
}
