import assert from 'assert'
import Role from '../../../main/cluster/role'

describe('role', function () {
  it('.isLeader(!clusterOn) should return false', function () {
    const clusterOn = false
    const isLeader = Role.isLeader(clusterOn)

    assert.equal(isLeader, false)
  })

  it('create Role directly with "new" should throw error', function () {
    assert.throws(() => new Role(), 'Role cannot be directly constructed')
  })

  it('.isLeader(clusterOn) should return true', function () {
    const clusterOn = true
    const isLeader = Role.isLeader(clusterOn)

    assert.equal(isLeader, true)
  })

  it('.isServer(!clusterOn) should return true', function () {
    const clusterOn = false
    const isServer = Role.isServer(clusterOn)

    assert.equal(isServer, true)
  })

  it('.isServer(clusterOn) should return false', function () {
    const clusterOn = true
    const isServer = Role.isServer(clusterOn)

    assert.equal(isServer, false)
  })
})
