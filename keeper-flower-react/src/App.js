import React from 'react'

// Components
import Form from './components/Form'

import './App.scss'

const LOGO_URL = 'https://gateway.pinata.cloud/ipfs/QmR9sMDFLTd69dusQLkjorbSaKmV1rMZHTZF6D1yUh9HpH'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={LOGO_URL} className='App-logo' alt='logo' />
        <p>NFT Flores</p>
        <a
          href='https://testnets.opensea.io/collection/nftflowers'
          className='text-blue-600 visited:text-purple-600'
          target='_blank' rel='noreferrer'
        >
          Miralo en OpenSea
        </a>
      </header>
      <main className='min-h-full flex items-center justify-center'>
        <Form />
      </main>
    </div>
  )
}

export default App
