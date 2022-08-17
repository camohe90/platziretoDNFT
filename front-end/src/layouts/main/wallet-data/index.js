import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../../config/web3';
import { useEffect, useCallback, useState, useMemo } from 'react';
// import useTruncatedAddress from '../../../hooks/useTruncatedAddress';

const useTruncatedAddress = (account) => {
  const truncated = useMemo(
    () => `${account?.slice(0, 6)}...${account?.substr(-4)}`,
    [account]
  );
  return truncated;
};

const WalletData = () => {
  const [balance, setBalance] = useState(0);
  const { active, activate, account, error, deactivate, library } =
    useWeb3React();

  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', 'true');
  }, [activate]);

  const disconnect = () => {
    localStorage.removeItem('previouslyConnected', 'false');
    deactivate();
  };

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect();
  }, [connect]);

  const getBalance = useCallback(async () => {
    const balanceToSet = await library.eth.getBalance(account);
    setBalance((balanceToSet / 1e18).toFixed(4));
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [getBalance]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <Flex alignItems={'center'}>
      {active ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to={`/punks?address=${account}`}>{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            d={{
              base: 'none',
              md: 'block',
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={'solid'}
          colorScheme={'green'}
          size={'sm'}
          leftIcon={<AddIcon />}
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? 'Red no soportada' : 'Conectar wallet'}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
