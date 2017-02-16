export default class ErrorMessage {
  constructor () {
    if (new.target === ErrorMessage) {
      throw new Error(ErrorMessage.cannotConstructed(ErrorMessage.name))
    }
  }

  static unimplementedMethod () {
    return `Unimplemented method`
  }

  static cannotConstructed (targetClass) {
    return `${targetClass} cannot be directly constructed`
  }

  static mustBe (targetClass, parentClass) {
    return `${targetClass} must be a ${parentClass} instance`
  }

  static notReady (targetClass) {
    return `${targetClass} is not ready`
  }

  static exited (targetClass) {
    return `${targetClass} exited accidentaly`
  }
}
