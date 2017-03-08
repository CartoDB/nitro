import { spawn } from 'child_process'

export default class AppSpawner {
  constructor (port = 0) {
    this.port = port
  }

  run () {
    return new Promise((resolve, reject) => {
      this.app = spawn('node', ['app.js', `-p ${this.port}`], {
        cwd: __dirname,
        // env: { 'NODE_ENV': 'test' },
        stdio: [ 'ignore', 'ignore', 'ignore', 'ipc' ]
      })

      this.app.on('error', err => reject(err))
      this.app.on('close', () => reject(new Error('close')))
      this.app.on('disconnect', () => reject(new Error('disconnect')))
      this.app.on('exit', () => reject(new Error('exit')))

      this.app.on('message', message => message.port
        ? resolve(message.port)
        : reject(new Error('App is not available'))
      )
    })
  }

  stop () {
    return new Promise((resolve) => {
      this.app.kill()
      resolve()
    })
  }
}
