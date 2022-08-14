const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { storeMetaData } = require("../utils/storePinata")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    let subscriptionId

    //metada previamente cargada
    const INTERVAL = 120 //En segundos
    let ifpsUris = [
        "https://ipfs.io/ipfs/QmVJyMfWbFi2YkPbR8HboekHK2neG8Bkkee9VkscYSSP7j",
        "https://ipfs.io/ipfs/QmU4QAU181GeZpFQAq9FVf9tdHDXCs2AwSj49shh3rEji2",
        "https://ipfs.io/ipfs/QmWZfUdGhcDrfFfjYK6rK5rfZ1K4xaknGir9tDGEgRuWde",
        "https://ipfs.io/ipfs/QmYk8DJNTmamhjtu8QMu3JXPvQiYDLG1qveWMUwSUMt4o3",
        "https://ipfs.io/ipfs/QmPPgAtAaPGh3X4y8n1NjoB5JGKUmRMbtqKMe9gvxE9mvV",
    ]
    //se puede cargar la metadata de forma dinamina con la api de pinata
    if (process.env.UPLOAD_PINATA == "true") {
        ifpsUris = await storeMetaData()
    }

    //Despliegue rinkeby

    if (!developmentChains.includes(network.name)) {
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

    const gasLane = networkConfig[chainId]["gasLane"]
    const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
    const interval = networkConfig[chainId]["interval"]

    console.log([INTERVAL, ifpsUris])
    const keeperFlower = await deploy("KeeperFlower", {
        from: deployer,
        args: [INTERVAL, ifpsUris],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(keeperFlower.address, [INTERVAL, ifpsUris])
    }

    log("-----------------------------------------------")
}

module.exports.tags = ["all", "keeperflower"]
