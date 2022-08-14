const { ethers, network } = require("hardhat")
const fs = require("fs") //read files

//const FRONT_END_ADDRESSES_FILE = "./constants/contractAddress.json";
//const FRONT_END_ABI_FILE = "./constants/abi.json";

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END == "true") {
        console.log("Updating front end...")
        await updateContractAddresses()
        await updateAbi()
    }
}

async function updateAbi() {
    const keeperFlower = await ethers.getContract("KeeperFlower")
    console.log("ABI")
    console.log(keeperFlower.interface.format(ethers.utils.FormatTypes.json))
    //fs.writeFileSync(FRONT_END_ABI_FILE, pokemonFactory.interface.format(ethers.utils.FormatTypes.json));
}

async function updateContractAddresses() {
    const keeperFlower = await ethers.getContract("KeeperFlower")
    const chainId = network.config.chainId.toString()

    //const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"));
    const currentAddresses = {}

    if (chainId in currentAddresses) {
        if (!currentAddresses[chainId].includes(keeperFlower.address)) {
            currentAddresses[chainId].push(keeperFlower.address)
        }
    }
    {
        currentAddresses[chainId] = [keeperFlower.address]
    }
    console.log("ADDRESS")
    console.log(currentAddresses)
    //fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

module.exports.tags = ["all", "frontend"]
