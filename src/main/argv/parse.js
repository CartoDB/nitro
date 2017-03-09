import meow from 'meow'
import readPkgUp from 'read-pkg-up'
import help from './help-info'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg
const options = {
  alias: {
    v: 'version',
    p: 'port',
    c: 'cluster',
    l: 'logger',
    o: 'console',
    m: 'metrics'
  }
}
const args = meow({ help, pkg }, options).flags

export default function parseArguments () {
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
