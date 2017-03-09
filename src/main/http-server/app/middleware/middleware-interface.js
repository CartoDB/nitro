import { AbstractClassError, UnimplementedError } from '../../../errors/errors'

export default class MiddlewareInterface {
  constructor () {
    if (new.target === MiddlewareInterface) {
      throw new AbstractClassError(MiddlewareInterface.name)
    }
  }

  regist () {
    throw new UnimplementedError()
  }

  middleware () {
    throw new UnimplementedError()
  }
}
