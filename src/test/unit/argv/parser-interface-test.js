import assert from 'assert'
import ParserInterface from '../../../main/argv/parser-interface'

class Parser extends ParserInterface {}

describe('parser-interface', function () {
  beforeEach(function () {
    this.parser = new Parser()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new ParserInterface(), 'ParserInterface cannot be directly constructed')
  })

  it('.parse() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.parser.parse(), 'Unimplemented method')
  })
})
