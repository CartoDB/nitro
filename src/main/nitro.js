import MetricsFactory from './metrics/metrics-factory'
import LoggerFactory from './logger/logger-factory'
import LauncherFactory from './launcher/launcher-factory'
import defaults from './config/defaults'

export { LEADER, SERVER } from './cluster/role'

export default class Nitro {
  constructor (clientOptions = {}) {
    const options = Object.assign({}, defaults, clientOptions)

    this._logger = LoggerFactory.create(options)
    this._metrics = MetricsFactory.create(this._logger, options)
    this._launcher = LauncherFactory.create(this._metrics, this._logger, options)
  }

  get role () {
    return this._launcher.role
  }

  get app () {
    return this._launcher.app.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this._metrics.provider
  }

  get start () {
    return this._launcher.run.bind(this._launcher)
  }

  run () {
    return this._launcher.run()
  }

  get stop () {
    return this._launcher.close.bind(this._launcher)
  }

  close () {
    return this._launcher.close()
  }

  get kill () {
    return this._launcher.exit.bind(this._launcher)
  }

  exit () {
    return this._launcher.exit()
  }
}
