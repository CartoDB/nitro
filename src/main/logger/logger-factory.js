import FactoryInterface from '../factory-interface'
import Logger from './logger'
import DisabledLogger from './disabled-logger'
import LoggerOutputs from './logger-outputs'
import ConsoleOutput from './console-output'
import FileOutput from './file-output'
import Role from '../cluster/role'
import Bunyan from 'bunyan'
import SighupListener from './sighup-listener'
import LogCommandListener from './log-command-listener'
import Listeners from '../listeners'

export default class LoggerFactory extends FactoryInterface {
  static create (options) {
    const dummyLogger = new DisabledLogger()

    if (!options.logger.enabled) {
      return dummyLogger
    }

    const name = options.name
    const role = Role.getName(options.cluster.enabled)
    const path = options.logger.path
    const consoleEnabled = options.logger.console

    const loggerOutputs = new LoggerOutputs()
      .add(new ConsoleOutput(consoleEnabled))
      .add(new FileOutput(path))

    const bunyan = Bunyan.createLogger({
      name: name,
      role: role,
      streams: loggerOutputs.toArray(),
      serializers: Bunyan.stdSerializers
    })

    const reopenFileStreamsListeners = new Listeners()
      .add(new SighupListener(process, dummyLogger))
      .add(new LogCommandListener(process, dummyLogger))

    return new Logger(bunyan, reopenFileStreamsListeners)
  }
}
