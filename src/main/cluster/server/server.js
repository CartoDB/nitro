import Role, { SERVER } from '../role'
import ClusterInterface from '../cluster-interface'

export default class Server extends ClusterInterface {
  constructor (httpServer, logger) {
    super()
    this.httpServer = httpServer
    this.logger = logger
  }

  static is (clusterOn) {
    return Role.isServer(clusterOn)
  }

  get role () {
    return SERVER
  }

  get app () {
    return this.httpServer.app
  }

  async run () {
    try {
      const listener = await this.httpServer.run()
      this.logger.info('Ready')
      return listener
    } catch (err) {
      this.logger.error('Failed on initializing', err)
      this.exit(1)
    }
  }

  async close () {
    await this.httpServer.close()
  }

  async exit (failure) {
    try {
      await this.httpServer.close()
      this.logger.warn('Exit')
      process.exit(failure || 0)
    } catch (err) {
      this.logger.error('Failed on exit', err)
      process.exit(1)
    }
  }
}
