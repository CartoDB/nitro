import MetricsInterface from './metrics-interface'

export default class DisabledMetrics extends MetricsInterface {
  constructor (providerDisabled = false) {
    super()

    if (!providerDisabled) {
      this.provider = new DisabledMetrics(!providerDisabled)
    }
  }

  timing () {}

  gauge () {}

  logOnError () {}

  gaugeMemory () {}

  increment () {}
}
