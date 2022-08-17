//require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const apiAlchemy=process.env.APIALCHEMYKEY;
const apiEthscan=process.env.APIETHSCANKEY;
const privateKeyW1=process.env.PRIVATEKEYW1;

module.exports = {
  solidity: "0.8.7",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/"+apiAlchemy,
      accounts: [privateKeyW1],
    },
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/"+apiAlchemy,
      accounts: [privateKeyW1],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: apiEthscan
  }
};
