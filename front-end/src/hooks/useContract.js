import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import FlowerContract from '../config/web3/artifacts/FlowerContract';

const { address, abi } = FlowerContract;

export const useContract = () => {
  const { active, library, chainId } = useWeb3React();

  const contract = useMemo(() => {
    if (active) return new library.eth.Contract(abi, address[chainId]);
  }, [active, chainId, library?.eth?.Contract]);

  return contract;
};
