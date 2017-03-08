export default class MiddlewareInterface {
  constructor () {
    if (new.target === MiddlewareInterface) {
      throw new Error('MiddlewareInterface cannot be directly constructed')
    }
  }

  regist () {
    throw new Error('Unimplemented method')
  }

  middleware () {
    throw new Error('Unimplemented method')
  }
}
