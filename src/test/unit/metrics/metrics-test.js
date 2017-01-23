import assert from 'assert'
import sinon from 'sinon'
import MetricsInterface from '../../../main/metrics/metrics-interface'
import LoggerInterface from '../../../main/logger/logger-interface'
import Metrics from '../../../main/metrics/metrics'
import EventEmitter from 'events'

const GAUGE_MEMORY_INTERVAL = 1

class MetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = new EventEmitter()
  }

  timing () {}
  gauge () {}
  increment () {}
}

class Logger extends LoggerInterface {}

describe('metrics', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsProvider()
    this.providerSocketMock = this.sandbox.mock(this.provider)

    this.logger = new Logger()
    this.logger.debug = this.sandbox.spy()

    this.metrics = new Metrics(this.provider, GAUGE_MEMORY_INTERVAL, this.logger)
  })

  afterEach(function () {
    assert.ok(this.logger.debug.called)
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', function () {
    this.provider.timing = this.sandbox.spy()
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(this.provider.timing.calledWithExactly(...args))
  })

  it('should log when socket emits error', function () {
    this.logger.error = this.sandbox.spy()
    const error = new Error('something went wrong')

    this.metrics.provider.socket.emit('error', error)

    assert.ok(this.logger.error.calledOnce)
  })

  it('.gauge() should gauge a stat by a specified amount', function () {
    const args = [ 'rss', 123.45 ]
    this.provider.gauge = this.sandbox.spy()

    this.metrics.gauge(...args)

    assert.ok(this.provider.gauge.calledWithExactly(...args))
  })

  it('.increment() should increment a stat given a key', function () {
    const args = [ 'home' ]
    this.provider.increment = this.sandbox.spy()

    this.metrics.increment(...args)

    assert.ok(this.provider.increment.calledWithExactly(...args))
  })
})
