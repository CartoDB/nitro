import cluster from 'cluster'
import FactoryInterface from '../../factory-interface'
import ServerManager from './server-manager'
import Sigusr2Listener from './sigusr2-listener'
import SighupListener from './sighup-listener'
import ServerExitListener from './server-exit-listener'
import Leader from './leader'

export default class LeaderFactory extends FactoryInterface {
  static create (metrics, logger) {
    const sigusr2Listener = new Sigusr2Listener(process, logger)
    const serverExitListener = new ServerExitListener(process, logger)
    const sighupListener = new SighupListener(process, logger)
    const serverManager = new ServerManager(cluster, sigusr2Listener, serverExitListener, sighupListener, logger)

    return new Leader(serverManager, logger)
  }

  static shouldCreate (clusterOn) {
    return Leader.is(clusterOn)
  }
}
