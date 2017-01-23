import LoggerOutputInterface from './logger-output-interface'
import ErrorMessage from '../utils/error-message'

export default class LoggerOutputs extends Set {
  add (output) {
    if (!(output instanceof LoggerOutputInterface)) {
      throw new Error(ErrorMessage.mustBe(output.constructor.name, LoggerOutputInterface.name))
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
