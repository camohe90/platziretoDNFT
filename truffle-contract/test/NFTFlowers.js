const { expect, should } = require('chai')

const NFTFlowers = artifacts.require('NFTFlowers')

contract('NFTFlowers', accounts => {
  [esteban] = accounts
  console.log('Esteban', esteban)

  let instance;
  beforeEach(async () => {
    instance = await NFTFlowers.new()
  })

  it('Contract owner', async () => {
    expect(await instance.owner()).to.equals(esteban)
  })

  it('Contract name', async () => {
    expect(await instance.name()).to.equals('NFTFlowers')
  })

  it('Contract symbol', async () => {
    expect(await instance.symbol()).to.equals('NFTF')
  })

  it('Mint contract', async () => {
    const uri = 'https://keeper-flower-react.infura-ipfs.io/ipfs/QmSRBKPPGQaCmSdW2MU2jHQESrmJcxi5wLrguDh9Gv8YN4'
    await instance.safeMint(esteban, uri)
    expect(await instance.tokenURI(0)).to.equals(uri)
  })
})