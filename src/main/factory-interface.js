import { AbstractClassError, UnimplementedError } from './errors/errors'

export default class FactoryInterface {
  constructor () {
    if (new.target === FactoryInterface) {
      throw new AbstractClassError(FactoryInterface.name)
    }
  }

  static create () {
    throw new UnimplementedError()
  }
}
