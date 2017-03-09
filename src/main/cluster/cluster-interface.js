import { AbstractClassError, UnimplementedError } from '../errors/errors'
import RunnerInterface from '../runner-interface'

export default class ClusterInterface extends RunnerInterface {
  constructor () {
    if (new.target === ClusterInterface) {
      throw new AbstractClassError(ClusterInterface.name)
    }
    super()
  }

  static is () {
    throw new UnimplementedError()
  }
}
