import FactoryInterface from '../../factory-interface'
import HttpServerFactory from '../../http-server/http-server-factory'
import Server from './server'

export default class ServerFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    const httpServer = HttpServerFactory.create(metrics, logger, options)
    return new Server(httpServer, logger)
  }

  static shouldCreate (clusterOn) {
    return Server.is(clusterOn)
  }
}
