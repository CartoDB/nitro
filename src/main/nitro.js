import MetricsFactory from './metrics/metrics-factory'
import LoggerFactory from './logger/logger-factory'
import LauncherFactory from './launcher/launcher-factory'
import defaults from './config/defaults'

const launcher = Symbol('launcher')
const logger = Symbol('logger')
const metrics = Symbol('metrics')

export default class Nitro {
  constructor (clientOptions = {}) {
    const options = Object.assign({}, defaults, clientOptions)

    this[logger] = LoggerFactory.create(options)
    this[metrics] = MetricsFactory.create(this[logger], options)
    this[launcher] = LauncherFactory.create(this[metrics], this[logger], options)
  }

  get role () {
    return this[launcher].role
  }

  get app () {
    return this[launcher].app.provider
  }

  get logger () {
    return this[logger].provider
  }

  get metrics () {
    return this[metrics].provider
  }

  run () {
    return this[launcher].run()
  }

  close () {
    return this[launcher].close()
  }

  exit () {
    return this[launcher].exit()
  }
}
