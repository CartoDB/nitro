import HelloWorld from '../example/hello-world'

async function run () {
  const helloWorld = new HelloWorld()

  try {
    const httpServer = helloWorld.start()

    if (typeof process.send === 'function') {
      process.send({ port: httpServer.address().port })
    }
  } catch (err) {
    helloWorld.nitro.logger.error(err)
  }
}

run()
