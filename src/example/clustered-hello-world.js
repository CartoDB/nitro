import HelloWorld from './hello-world'

export default class ClusteredHelloWorld extends HelloWorld {
  constructor () {
    super({
      cluster: {
        enabled: true
      }
    })
  }
}
