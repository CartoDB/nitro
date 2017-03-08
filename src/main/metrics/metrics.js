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
    this.provider.socket.on('error', err => this.logger.error('Error sending stats:', err))

    this.logger.debug('Log on error sending stats activated')
  }

  gaugeMemory () {
    this.memoryInterval = setInterval(() => {
      const memoryUsage = process.memoryUsage()

      Object.keys(memoryUsage).forEach(property => this.gauge(`memory.${property}`, memoryUsage[property]))
    }, this.interval)

    this.logger.debug('Gauge memory activated every %s seconds', this.interval / 1000)
  }

  gaugeCPU () {
    let previousCPUUsage = process.cpuUsage()

    this.cpuInterval = setInterval(() => {
      const CPUUsage = process.cpuUsage(previousCPUUsage)

      Object.keys(CPUUsage).forEach(property => this.gauge(`cpu.${property}`, CPUUsage[property]))

      previousCPUUsage = CPUUsage
    }, this.interval)

    this.logger.debug('Gauge CPU activated every %s seconds', this.interval / 1000)
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
