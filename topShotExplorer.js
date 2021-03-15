const fcl = require("@onflow/fcl")
fcl.config().put("accessNode.api", "https://access-mainnet-beta.onflow.org")

// Get set name by id sample
fcl.send([
  fcl.script`
        import TopShot from 0x0b2a3299cc857e29
        pub fun main(): [String] {

            //My Account
            // let acct = getAccount(0xb856a6709d080033)

            //Alex's Account
            let acct = getAccount(0x8bc1c0249e2ebb3e)
        
            let collectionRef = acct.getCapability(/public/MomentCollection)
                                    .borrow<&{TopShot.MomentCollectionPublic}>()!        
            let collectionIDs = collectionRef.getIDs()
            var collectionNFTs: [String] = []
            let serialSearch: UInt32 = 2121
            for element in collectionIDs{
              let token = collectionRef.borrowMoment(id: element)
                ?? panic("Could not borrow a reference to the specified moment")
              let data = token.data
              if(data.serialNumber==serialSearch){
                // let metadata=TopShot.getPlayMetaDataByField(playID: data.playID, field: "FirstName")
                collectionNFTs.append("Hello")
              }
            }
            return collectionNFTs
        }
      `
])
  .then(response => fcl.decode(response))
  .then(metadata => console.log(metadata))