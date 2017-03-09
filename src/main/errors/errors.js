import ExtendableError from 'es6-error'

export class UnimplementedError extends ExtendableError {
  constructor (message = 'Unimplemented method') {
    super(message)
  }
}

export class AbstractClassError extends ExtendableError {
  constructor (target = 'Unknown class name') {
    super(`${target} cannot be directly constructed`)
  }
}

export class ParentClassError extends ExtendableError {
  constructor (target = 'Unknown', parent = 'Unknown') {
    super(`${target} must be a ${parent} instance`)
  }
}

export class NotReadyError extends ExtendableError {
  constructor (target = 'Unknown') {
    super(`${target} is not ready`)
  }
}

export class ExitError extends ExtendableError {
  constructor (target = 'Unknown') {
    super(`${target} exited accidentaly`)
  }
}
