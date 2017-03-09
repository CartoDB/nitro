import ParserInterface from './parser-interface'
import meow from 'meow'
import readPkgUp from 'read-pkg-up'
import help from './help-info'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg
const options = {
  alias: {
    c: 'cluster',
    p: 'port',
    l: 'logger',
    o: 'console',
    v: 'version'
  }
}
const args = meow({ help, pkg }, options).flags

export default class ArgumentParser extends ParserInterface {
  static parse () {
    return {
      flags: args,
      port: args.port,
      cluster: {
        enabled: args.cluster
      },
      logger: {
        enabled: args.logger,
        console: args.console,
        path: args.logPath
      },
      metrics: {
        enabled: args.metrics
      }
    }
  }
}
