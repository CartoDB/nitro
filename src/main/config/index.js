import defaultsDeep from 'lodash.defaultsdeep'
import defaultOptions from './defaults'
import parseArguments from './argv/parse'
import Role from '../cluster/role'

export default function config (clientOptions = {}) {
  const argumentOptions = parseArguments(clientOptions.arguments)
  const options = defaultsDeep({}, argumentOptions, clientOptions, defaultOptions)

  options.cluster.role = Role.getName(options.cluster.enabled)

  return options
}
