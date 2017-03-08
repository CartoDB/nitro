import MetricsInterface from './metrics-interface'

export default class Metrics extends MetricsInterface {
  constructor (metrics, interval, logger) {
    super()
    this.provider = metrics
    this.interval = interval
    this.logger = logger

    this.logOnError()
    this.gaugeMemory()
    this.gaugeCPU()
  }

  logOnError () {
    this.logger.debug('Log on error sending stats activated')
    this.provider.socket.on('error', err => this.logger.error('Error sending stats:', err))
  }

  gaugeMemory () {
    this.logger.debug('Gauge memory activated')
    this.memoryInterval = setInterval(() => {
      const memoryUsage = process.memoryUsage()
      Object.keys(memoryUsage).forEach(property => this.gauge('memory.' + property, memoryUsage[property]))
    }, this.interval)
  }

  gaugeCPU () {
    this.logger.debug('Gauge CPU activated')
    let previousCPUUsage = process.cpuUsage()
    this.cpuInterval = setInterval(() => {
      const CPUUsage = process.cpuUsage(previousCPUUsage)
      Object.keys(CPUUsage).forEach(property => {
        this.logger.info('cpu.' + property + ':' + CPUUsage[property])
        this.gauge('cpu.' + property, CPUUsage[property])
      })
      previousCPUUsage = CPUUsage
    }, this.interval)
  }

  timing () {
    this.provider.timing(...arguments)
  }

  gauge () {
    this.provider.gauge(...arguments)
  }

  increment () {
    this.provider.increment(...arguments)
  }
}
