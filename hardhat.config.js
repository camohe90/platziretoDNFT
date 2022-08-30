/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('hardhat-abi-exporter');

const { API_URL, METAMASK_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.6",
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`] 
    }
  },
  abiExporter: {
    path: './abi',
    pretty: false,
    runOnCompile: true
  }
};
