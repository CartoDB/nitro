import LoggerOutputInterface from './logger-output-interface'
import { ParentClassError } from '../errors/errors'

export default class LoggerOutputs extends Set {
  add (output) {
    if (!(output instanceof LoggerOutputInterface)) {
      throw new ParentClassError(output.constructor.name, LoggerOutputInterface.name)
    }

    if (output.isAvailable()) {
      super.add(output)
    }

    return this
  }

  toArray () {
    return Array.from(this.values())
  }
}
