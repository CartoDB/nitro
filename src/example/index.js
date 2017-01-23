import meow from 'meow'
import HelloWorld from './hello-world'
import ClusteredHelloWorld from './clustered-hello-world'

const examples = new Map()
examples.set('hello-world', HelloWorld)
examples.set('clustered-hello-world', ClusteredHelloWorld)

const help = `
  Usage:
    $ npm run example [-- <options>]

  Options:
    -n, --name Launch the given example (default: hello-world)

  Examples
    $ npm run example -- -n hello-world
`
const options = {
  alias: {
    n: 'name'
  },
  default: {
    name: 'hello-world'
  }
}

const flags = meow({ help }, options).flags
const exampleName = flags.name
const Example = examples.get(exampleName)
const example = new Example()

example.run()
  .catch(err => example.nitro.logger.error(err))
