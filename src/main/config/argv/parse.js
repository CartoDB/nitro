import meow from 'meow'
import readPkgUp from 'read-pkg-up'
import helpInfo from './help-info'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg

const meowOptions = {
  alias: {
    v: 'version',
    p: 'port',
    c: 'cluster',
    l: 'logger',
    o: 'console',
    m: 'metrics'
  }
}

export default function parseArguments (options = {}) {
  const help = helpInfo(options.help)
  const args = meow({ help, pkg }, meowOptions).flags

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
