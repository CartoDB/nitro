import ParserInterface from './parser-interface'
import meow from 'meow'
import path from 'path'
import readPkgUp from 'read-pkg-up'
import help from './help-info'

export default class ArgumentParser extends ParserInterface {
  static parse () {
    const pkg = readPkgUp.sync({
      cwd: process.cwd(),
      normalize: false
    }).pkg

    const options = {
      alias: {
        c: 'cluster',
        p: 'port',
        l: 'logPath',
        o: 'console',
        v: 'version'
      },
      boolean: [ // options that are always boolean
        'cluster',
        'metrics',
        'logger',
        'console'
      ],
      default: {
        name: pkg.name,
        cluster: false,
        metrics: false,
        logger: true,
        port: 3000,
        logPath: path.join(process.cwd(), pkg.name + '.log'),
        console: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined)
      }
    }

    const processOptions = meow({ help, pkg }, options)

    return processOptions.flags
  }
}
