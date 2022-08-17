import { useWeb3React } from '@web3-react/core';
import { useEffect, useState, useCallback } from 'react';
import { useContract } from './useContract';
const getPlantData = async ({ plantContract, tokenId }) => {
  const [tokenURI, owner] = await Promise.all([
    plantContract.methods.tokenURI(tokenId).call(),
    plantContract.methods.ownerOf(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();

  return {
    tokenId,
    tokenURI,
    owner,
    ...metadata,
  };
};

export const usePlantsData = ({ owner = null } = {}) => {
  const [plants, setPlants] = useState([]);
  const { library } = useWeb3React();

  const [loading, setLoading] = useState(true);
  const plantContract = useContract();

  const update = useCallback(async () => {
    if (plantContract) {
      setLoading(true);
      let tokenIds;

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await plantContract.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await plantContract.methods.balanceOf(owner).call();
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) => {
            return plantContract.methods
              .tokenOfOwnerByIndex(owner, index)
              .call();
          });
        tokenIds = await Promise.all(tokenIdsOfOwner);
      }
      const plantsPromise = tokenIds.map((tokenId) => {
        return getPlantData({ tokenId, plantContract });
      });

      const plantsAwait = await Promise.all(plantsPromise);
      setPlants(plantsAwait);
      setLoading(false);
    }
  }, [plantContract, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);
  return {
    loading,
    plants,
    update,
  };
};

export const usePlantData = (tokenId = null) => {
  const [plant, setPlant] = useState();
  const [loading, setLoading] = useState(true);
  const plantContract = useContract();

  const update = useCallback(async () => {
    if (plantContract && tokenId !== null) {
      setLoading(true);
      const toSet = await getPlantData({ tokenId, plantContract });
      setPlant(toSet);
      setLoading(false);
    }
  }, [plantContract, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return { plant, loading, update };
};
