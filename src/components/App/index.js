import React from 'react';
import { ethers } from 'ethers';

import addresess from '../../blockchain/environment/contract-address.json'
import nftDinamicCompile from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/NFTDinamic.sol/NFTDinamic.json'

function App() {

  const nft = () => {
    const provider = ethers.providers.getDefaultProvider('localhost')
    const nftDinamicContract = new ethers.Contract(addresess.nftdinamiccontract, nftDinamicCompile.abi, provider)


  }

  React.useEffect(()=> {
    nft();
  }, [])

  return (
    <React.Fragment>
      <h1>Hello World</h1>
    </React.Fragment>
  );
}

export default App;
