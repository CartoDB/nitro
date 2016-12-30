'use strict'

const MetricsFactory = require('./metrics/metrics-factory')
const LoggerFactory = require('./logger/logger-factory')
const LauncherFactory = require('./launcher/launcher-factory')
const defaults = require('./config/defaults')

const launcher = Symbol('launcher')
const logger = Symbol('logger')
const metrics = Symbol('metrics')

class Nitro {
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

module.exports = Nitro
