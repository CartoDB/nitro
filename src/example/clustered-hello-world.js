import HelloWorld from './hello-world'

export default class ClusteredHelloWorld {
  constructor () {
    const options = {
      cluster: {
        enabled: true
      }
    }

    return new HelloWorld(options)
  }
}
