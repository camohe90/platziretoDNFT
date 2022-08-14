const fs = require('fs')
const { ethers } = require('hardhat')

async function main () {
  const NFTDinamicContract = await ethers.getContractFactory('NFTDinamic')
  const nftDinamic = await NFTDinamicContract.deploy(120)
  await nftDinamic.deployed()
  console.log('NFT Dinamic Contract was deployed to: ' + nftDinamic.address)

  const NFTManualContract = await ethers.getContractFactory('NFTManual')
  const nftManual = await NFTManualContract.deploy()
  await nftManual.deployed()
  console.log('NFT Manual Contract was deployed to: ' + nftManual.address)

  const addresses = {
    nftdinamiccontract: nftDinamic.address,
    nftmanualcontract: nftManual.address
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