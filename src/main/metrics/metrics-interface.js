import { AbstractClassError, UnimplementedError } from '../errors/errors'

export default class MetricsInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new AbstractClassError(MetricsInterface.name)
    }
  }

  timing () {
    throw new UnimplementedError()
  }

  gauge () {
    throw new UnimplementedError()
  }

  logOnError () {
    throw new UnimplementedError()
  }

  gaugeMemory () {
    throw new UnimplementedError()
  }

  increment () {
    throw new UnimplementedError()
  }
}
