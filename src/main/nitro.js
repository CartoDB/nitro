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

  get start () {
    return this[launcher].run.bind(this[launcher])
  }

  run () {
    return this[launcher].run()
  }

  get stop () {
    return this[launcher].close.bind(this[launcher])
  }

  close () {
    return this[launcher].close()
  }

  get kill () {
    return this[launcher].exit.bind(this[launcher])
  }

  exit () {
    return this[launcher].exit()
  }
}
