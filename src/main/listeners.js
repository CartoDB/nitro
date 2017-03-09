import ListenerInterface from './listener-interface'
import { ParentClassError } from './errors/errors'

export default class Listeners extends Set {
  add (listener) {
    if (!(listener instanceof ListenerInterface)) {
      throw new ParentClassError(listener.constructor.name, ListenerInterface.name)
    }

    super.add(listener)

    return this
  }

  listen (exit) {
    for (let listener of this) {
      listener.listen(exit)
    }
  }

  remove () {
    for (let listener of this) {
      listener.remove()
    }
  }
}
