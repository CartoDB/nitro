import path from 'path'
import readPkgUp from 'read-pkg-up'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg

export default {
  name: pkg.name,
  port: 3000,
  cluster: {
    enabled: false
  },
  logger: {
    enabled: true,
    console: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined),
    path: path.join(process.cwd(), pkg.name + '.log')
  },
  metrics: {
    enabled: false,
    host: 'localhost',
    port: 8125,
    interval: 5000
  }
}
