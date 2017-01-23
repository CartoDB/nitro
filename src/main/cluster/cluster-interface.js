import ErrorMessage from '../utils/error-message'
import RunnerInterface from '../runner-interface'

export default class ClusterInterface extends RunnerInterface {
  constructor () {
    if (new.target === ClusterInterface) {
      throw new Error(ErrorMessage.cannotConstructed(ClusterInterface.name))
    }
    super()
  }

  static is () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
