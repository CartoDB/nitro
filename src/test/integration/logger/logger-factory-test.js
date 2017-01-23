import assert from 'assert'
import defaults from '../../../main/config/defaults'
import LoggerInterface from '../../../main/logger/logger-interface'
import LoggerFactory from '../../../main/logger/logger-factory'

describe('logger-factory', function () {
  it('.create() should return a Logger instance', function () {
    const logger = LoggerFactory.create(defaults)

    assert.ok(logger instanceof LoggerInterface)
  })

  it('.create() should return a Logger instance when disabled', function () {
    const options = Object.assign({}, defaults, {
      logger: {
        enabled: false
      }
    })

    const logger = LoggerFactory.create(options)

    assert.ok(logger instanceof LoggerInterface)
  })
})
