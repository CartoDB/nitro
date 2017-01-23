import { isMaster } from 'cluster'
import ErrorMessage from '../utils/error-message'

export const LEADER = 'leader'
export const SERVER = 'server'

export default class Role {
  constructor () {
    if (new.target === Role) {
      throw new Error(ErrorMessage.cannotConstructed(Role.name))
    }
  }

  static isLeader (clusterOn) {
    return clusterOn && isMaster
  }

  static isServer (clusterOn) {
    return !this.isLeader(clusterOn)
  }

  static get (clusterOn) {
    return this.isLeader(clusterOn) ? LEADER : SERVER
  }
}
