require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

/**
 @type import('hardhat/config').HardhatUserConfig
**/

module.exports = {
  paths: {
    // se enrutan las fuentes del blockchain
    sources: './src/blockchain/hardhat/contracts',
    tests: './src/blockchain/hardhat/test',
    cache: './src/blockchain/hardhat/cache',
    artifacts: './src/blockchain/hardhat/artifacts'
  },
  defaultNetwork: 'rinkeby',
  networks: {
    hardhat: {
      // If want to do some forking, uncomment this
      // forking: {
      //  url: MAINNET_RPC_URL
      // }
    },
    localhost: {},
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true
    }
  },
  solidity: '0.8.9'
}
