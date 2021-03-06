import RunnerInterface from '../runner-interface'
import { NotReadyError } from '../errors/errors'

export default class HttpServer extends RunnerInterface {
  constructor (app, port, logger) {
    super()
    this.app = app
    this.port = port
    this.logger = logger
    this.httpServer = null
  }

  run () {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port)

      if (!this.httpServer) {
        return reject(new NotReadyError('Server'))
      }

      this.httpServer.once('error', err => reject(err))

      this.httpServer.once('listening', () => {
        this.logger.info('Server started on port', this.port)
        resolve(this.httpServer)
      })
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        return resolve()
      }

      this.httpServer.once('close', () => {
        this.logger.info('Server stopped')
        resolve()
      })

      this.httpServer.once('error', err => reject(err))

      this.httpServer.close()
    })
  }
}
