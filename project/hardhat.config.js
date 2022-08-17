require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const projectId = process.env.INFURA_PROJECT_ID
const deployer = process.env.DEPLOYER_SIGNER_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.6",
  networks: {
    rinkeby:{
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [
        deployer
      ]
    }
  },
};
