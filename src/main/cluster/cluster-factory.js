import FactoryInterface from '../factory-interface'
import ServerFactory from './server/server-factory'
import LeaderFactory from './leader/leader-factory'

const ClusterClassFactories = new Set([ LeaderFactory, ServerFactory ])

export default class ClusterFactory extends FactoryInterface {
  static create (metrics, logger, options) {
    for (let ClusterClassFactory of ClusterClassFactories) {
      if (ClusterClassFactory.shouldCreate(options.cluster.enabled)) {
        return ClusterClassFactory.create(metrics, logger, options)
      }
    }
  }
}
