import HelloWorld from '../example/hello-world'

const helloWorld = new HelloWorld()

helloWorld.nitro.run()
  // if process was spawned with IPC channel,
  // then send "listening port" to the parent process
  .then(httpServer => typeof process.send === 'function'
    ? process.send({ port: httpServer.address().port })
    : undefined
  )
  .catch(err => helloWorld.nitro.logger.error(err))
