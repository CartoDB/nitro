import ErrorMessage from './utils/error-message'

export default class RunnerInterface {
  constructor () {
    if (new.target === RunnerInterface) {
      throw new Error(ErrorMessage.cannotConstructed(RunnerInterface.name))
    }
  }

  run () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  close () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  exit () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
