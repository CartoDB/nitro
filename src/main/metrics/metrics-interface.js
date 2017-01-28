import ErrorMessage from '../utils/error-message'

export default class MetricsInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new Error(ErrorMessage.cannotConstructed(MetricsInterface.name))
    }
  }

  timing () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  gauge () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  logOnError () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  gaugeMemory () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }

  increment () {
    throw new Error(ErrorMessage.unimplementedMethod())
  }
}
