const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {
  const NFTDinamicContract = await ethers.getContractFactory('NFTDinamic')
  const nftDinamic = await NFTDinamicContract.deploy()
  await nftDinamic.deployed()
  console.log('NFT Dinamic Contract was deployed to: ' + nftDinamic.address)

  const addresses = {
    nftdinamiccontract: nftDinamic.address
  }
  const addressesJSON = JSON.stringify(addresses)
  fs.writeFileSync('src/blockchain/environment/contract-address.json', addressesJSON)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })