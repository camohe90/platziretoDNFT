import React from 'react'
import { ethers } from 'ethers'

import { getNft } from '../../middleware/getNft'
import addresses from '../../blockchain/environment/contract-address.json'
import nftDinamicCompile from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/NFTDinamic.sol/NFTDinamic.json'
import nftManualContract from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/NFTManual.sol/NFTManual.json'

const NFTContext = React.createContext()

function NFTProvider (props) {
  const [nftsMetadata, setNftsMetadata] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [disabled, setDisable] = React.useState(true)
  const [buttonDisable, setButtonDisable] = React.useState(false)

  const fetchData = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rinkeby.infura.io/v3/b28b2656eeb34d4c8af86c3ca0ea3bc2'
      )
      const nftManual = new ethers.Contract(
        addresses.nftmanualcontract,
        nftManualContract.abi,
        provider
      )
      const nftDinamic = new ethers.Contract(
        addresses.nftdinamiccontract,
        nftDinamicCompile.abi,
        provider
      )
      const arr = []
      arr.push(await getNft(nftManual))
      arr.push(await getNft(nftDinamic))

      setNftsMetadata(arr)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <NFTContext.Provider
      value={{
        addresses,
        nftDinamicCompile,
        nftManualContract,
        nftsMetadata,
        disabled,
        setDisable,
        buttonDisable,
        setButtonDisable,
        error,
        loading,
        setLoading
      }}
    >
      {props.children}
    </NFTContext.Provider>
  )
}

export { NFTContext, NFTProvider }
