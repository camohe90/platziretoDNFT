import React from "react";
import { ethers } from "ethers";

import { Button } from "@chakra-ui/react";

function NFTS({
  addresses,
  nftManualContract,
  nftsMetadata,
  disabled,
  setLoading,
  setDisable,
  setButtonDisable,
}) {
  const changeImage = async () => {
    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const nftManual = new ethers.Contract(
        addresses.nftmanualcontract,
        nftManualContract.abi,
        web3Signer
      );
      setLoading(true);
      setDisable(true);
      setButtonDisable(true);
      await nftManual.changeNumber(0);
      setTimeout(() => {
        window.location.reload();
      }, 20000);
    } catch (_error) {
      setLoading(false);
      setDisable(false);
      setButtonDisable(false);
    }
  };

  return (
    <div className="container">
      {nftsMetadata.map((nft, index) => (
        <div key={index}>
          <p>{nft.name}</p> 
          <p>descripción: {nft.description}</p>
          <span>Atributos: </span>
          <p>{nft.trait}</p>
          <p>{nft.value}</p>
          <figure>
            <img src={nft.image} alt={'nft'} />
          </figure>
          <Button
            border="1px"
            borderColor="#003865"
            color="#003865"
            type="click"
            onClick={changeImage}
            disabled={disabled}
          >
            Cambiar imagen
          </Button>
        </ div>
      ))}
    </div>
  );
}

export { NFTS };
