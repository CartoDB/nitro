import { AbstractClassError, UnimplementedError } from './errors/errors'

export default class ListenerInterface {
  constructor () {
    if (new.target === ListenerInterface) {
      throw new AbstractClassError(ListenerInterface.name)
    }
  }

  listen () {
    throw new UnimplementedError()
  }

  remove () {
    throw new UnimplementedError()
  }
}
