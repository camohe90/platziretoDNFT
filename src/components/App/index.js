import React from 'react';
import { ethers } from 'ethers';

import addresess from '../../blockchain/environment/contract-address.json';
import nftDinamicCompile from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/NFTDinamic.sol/NFTDinamic.json';
import nftManualCompile from '../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/NFTManual.sol/NFTManual.json';

function App() {
  const nft = async () => {
    const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/b28b2656eeb34d4c8af86c3ca0ea3bc2');
    const nftManualContract = new ethers.Contract(addresess.nftmanualcontract, nftManualCompile.abi, provider);
    const tokenUri = await nftManualContract.tokenURI(0);
  };

  React.useEffect(() => {
    nft();
  }, []);

  return (
    <React.Fragment>
      <h1>Hello World</h1>
    </React.Fragment>
  );
}

export default App;
