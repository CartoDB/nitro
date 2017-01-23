import LoggerOutputInterface from './logger-output-interface'

export default class FileOutput extends LoggerOutputInterface {
  constructor (path) {
    super()
    this.level = 'info'
    this.path = path
  }

  isAvailable () {
    return (process.env.NODE_ENV !== 'development')
  }
}
