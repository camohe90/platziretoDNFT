import React from 'react'
import { ethers } from 'ethers'

import { Button } from '@chakra-ui/react'
import './NFTS.scss'

function NFTS ({
  addresses,
  nftManualContract,
  nftsMetadata,
  disabled,
  setLoading,
  setDisable,
  setButtonDisable
}) {
  const changeImage = async () => {
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      const web3Signer = web3Provider.getSigner()
      const nftManual = new ethers.Contract(
        addresses.nftmanualcontract,
        nftManualContract.abi,
        web3Signer
      )
      setLoading(true)
      setDisable(true)
      setButtonDisable(true)
      await nftManual.changeNumber(0)
      setTimeout(() => {
        window.location.reload()
      }, 20000)
    } catch (_error) {
      setLoading(false)
      setDisable(false)
      setButtonDisable(false)
    }
  }

  if (nftsMetadata.length === 0) return <></>
  return (
    <div className='nfts '>
      <div className='nft'>
        <p className='title'>NFT Manual</p>
        <p>{nftsMetadata[0].name}</p>
        <p>{nftsMetadata[0].description}</p>
        <p>Atributos: </p>
        <span>
          <p>Rasgo: {nftsMetadata[0].trait}</p> 
          <p>Valor: {nftsMetadata[0].value}</p>
        </span>
        <figure>
          <img src={nftsMetadata[0].image} alt='nft' />
        </figure>
        <Button
          border='1px'
          borderColor='#003865'
          color='#003865'
          type='click'
          onClick={changeImage}
          disabled={disabled}
        >
          Cambiar imagen
        </Button>
      </div>
      <div className='nft'>
        <p className='title'>NFT Dinámico</p>
        <p><strong>Nombre:</strong> {nftsMetadata[1].name}</p>
        <p><strong>Descripción:</strong> {nftsMetadata[1].description}</p>
        <p><strong>Atributos:</strong> </p>
        <span>
          <p><strong>Rasgos: </strong> {nftsMetadata[1].trait}</p> 
          <p><strong>Valor: </strong> {nftsMetadata[1].value}</p>
        </span>
        <figure>
          <img src={nftsMetadata[1].image} alt='nft' />
        </figure>
      </div>
    </div>
  )
}

export { NFTS }
