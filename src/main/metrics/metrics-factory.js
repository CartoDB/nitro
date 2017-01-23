import FactoryInterface from '../factory-interface'
import Role from '../cluster/role'
import Metrics from './metrics'
import DisabledMetrics from './disabled-metrics'
import StatsD from 'node-statsd'

export default class MetricsFactory extends FactoryInterface {
  static create (logger, options) {
    if (!options.metrics.enabled) {
      return new DisabledMetrics()
    }

    const host = options.metrics.host
    const port = options.metrics.port
    const interval = options.metrics.interval
    const name = options.name
    const role = Role.get(options.cluster.enabled)
    const prefix = [ name, role ].join('.')
    const statsd = new StatsD(host, port, prefix)

    return new Metrics(statsd, interval, logger)
  }
}
