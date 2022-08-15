import React from 'react'
import { ethers } from 'ethers'

import './NFTWallet.scss'
import { Button } from '@chakra-ui/react'

function NFTWallet ({ buttonDisable, setDisable }) {
  const [walletDesconected, setWalletDesconected] = React.useState(true)
  const [addressWallet, setAdressWallet] = React.useState('')

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await web3Provider.send('eth_requestAccounts', [])
      const wallet = accounts[0]
      const web3Signer = web3Provider.getSigner()
      const chanId = await web3Signer.getChainId()

      if (chanId !== 4) {
        alert('Please change your network to Rinkeby testnet!')
        return
      }

      setWalletDesconected(false)
      setAdressWallet('...' + String(wallet).slice(38))
      setDisable(false)
    } else {
      alert('No tienes Metamask instalado en tu navegador')
    }
  }

  return (
    <Button
      border='1px'
      borderColor='#003865'
      color='#003865'
      onClick={connectWallet}
      minWidth='10%'
      disabled={buttonDisable}
    >
      {walletDesconected ? 'Conecta tu billetera' : addressWallet}
    </Button>
  )
}

export { NFTWallet }
