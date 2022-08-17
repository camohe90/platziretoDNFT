import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";

require('dotenv').config()

const { ROBSTEN_RPC_URL, PRIVATE_KEY } = process.env;

// Una vez desplegado, entramos a rinkeby.etherscan y desplegamos una interfaz
// npx hardhat flatten > Flattened.sol

module.exports = {
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${ROBSTEN_RPC_URL}`,
      accounts: [PRIVATE_KEY]
    }
  }
  ,
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "68SHFQFE8PYCQ8G7BRADWQYMASB5IZS3V6"
  }
};
