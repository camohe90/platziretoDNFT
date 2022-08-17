import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
} from '@chakra-ui/react';
import { useContract } from '../../hooks/useContract';

export const Home = () => {
  const { active, account } = useWeb3React();
  const platziPlanta = useContract();

  const toast = useToast();
  const [imageSrc, setImageSrc] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [lastOwner, setLastOwner] = useState('0x0000');
  const [noMinted, setNoMinted] = useState(
    'Ningún NFT minteado aún, ¡se el primero!'
  );
  const getLastPlantData = useCallback(async () => {
    if (platziPlanta) {
      const totalSupplyToSet = await platziPlanta.methods.totalSupply().call();
      const tokenURI = await platziPlanta.methods
        .tokenURI(totalSupplyToSet - 1)
        .call();
      setTotalSupply(totalSupplyToSet);
      if (totalSupplyToSet > 0) {
        const addressOwner = await platziPlanta.methods
          .ownerOf(totalSupplyToSet - 1)
          .call();
        setLastOwner(addressOwner);
        const data = await fetch(tokenURI);
        const dataJson = await data.json();
        setImageSrc(dataJson.image);
        setNoMinted('');
        const type = await platziPlanta.methods
          .flowerStage(totalSupplyToSet - 1)
          .call();
        console.log(type);
      }
    }
  }, [platziPlanta, account]);

  useEffect(() => {
    getLastPlantData();
  }, [getLastPlantData]);

  const mint = () => {
    setIsMinting(true);
    platziPlanta.methods
      .safeMint(account)
      .send({
        from: account,
      })
      .on('transactionHash', (txHash) => {
        toast({
          title: 'Transacción enviada',
          description: txHash,
          status: 'info',
        });
      })
      .on('receipt', () => {
        toast({
          title: 'Transacción confirmada',
          description: 'Nunca pares de aprender',
          status: 'success',
        });
        setIsMinting(false);
      })
      .on('error', (error) => {
        toast({
          title: 'Transacción fallida',
          description: error.message,
          status: 'error',
        });
        setIsMinting(false);
      });
  };

  return (
    <>
      <Stack
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column-reverse', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                left: 0,
                zIndex: -1,
              }}
            >
              Un Platzi planta para
            </Text>
            <br />
            <Text as={'span'} color={'green.400'}>
              nunca para de aprender
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Platzi plantas es una colección de plantas cuya metadata es
            personalizada por quien las mintea.
          </Text>
          <Text color={'green.500'}>
            Cada Platzi planta se genera a partir de la información que
            proporciones y estas evolucionan con el paso del tiempo, justo igual
            que tu aprendizaje. minteas en este momento
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              rounded={'full'}
              size={'lg'}
              fontWeight={'normal'}
              px={6}
              colorScheme={'green'}
              bg={'green.400'}
              _hover={{ bg: 'green.500' }}
              disabled={!platziPlanta}
              onClick={mint}
              isLoading={isMinting}
            >
              Obtén tu NFT dinamico
            </Button>
            <Link to="/plants">
              <Button rounded={'full'} size={'lg'} fontWeight={'normal'} px={6}>
                Galería
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={'center'}
          align={'center'}
          position={'relative'}
          w={'full'}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'contain'}
            src={active ? imageSrc : 'https://avataaars.io/'}
          />
          <Text color="blue.300">Última platzi planta minteada</Text>
          <Text color="blue.300">{noMinted}</Text>
          {active ? (
            <>
              <Flex mt={2}>
                <Badge>
                  Next ID:
                  <Badge ml={1} colorScheme="green">
                    {totalSupply}
                  </Badge>
                </Badge>
                <Badge ml={2}>
                  Owner:
                  <Badge ml={1} colorScheme="green">
                    {lastOwner}
                  </Badge>
                </Badge>
              </Flex>
              <Button
                onClick={getLastPlantData}
                mt={4}
                size="xs"
                colorScheme="green"
              >
                Actualizar
              </Button>
            </>
          ) : (
            <Badge mt={2}>Wallet desconectado</Badge>
          )}
        </Flex>
      </Stack>
    </>
  );
};
