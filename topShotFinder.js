const fcl = require("@onflow/fcl")
fcl.config().put("accessNode.api", "https://access-mainnet-beta.onflow.org")

// Get set name by id sample
fcl.send([
  fcl.script`
        import TopShot from 0x0b2a3299cc857e29
        pub fun main(): String {
          return TopShot.getSetName(setID: 26)!
        }
      `
])
  .then(response => fcl.decode(response))
  .then(metadata => console.log(metadata))

// Get play metadata by id sample
fcl.send([
  fcl.script`
        import TopShot from 0x0b2a3299cc857e29
        pub fun main(): {String: String} {
          return TopShot.getPlayMetaData(playID: 1)!
        }
      `
])
  .then(response => fcl.decode(response))
  .then(metadata => console.log(metadata))