import React, { useState } from 'react';
import { PlantCard } from '../../components/plant-card';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useWeb3React } from '@web3-react/core';
import { usePlantsData } from '../../hooks/usePlantsData';
import {
  Grid,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  FormControl,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export const Plants = () => {
  const { search } = useLocation();
  const { active, library } = useWeb3React();
  const [address, setAddress] = useState(() => {
    const address = new URLSearchParams(search).get('address');
    if (address) return address;
    else return '';
  });
  const [submitted, setSubmitted] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const navigate = useNavigate();
  const { plants, loading } = usePlantsData({
    owner: submitted && validAddress ? address : null,
  });

  const handleAddressChange = ({ target: { value } }) => {
    setAddress(value);
    setSubmitted(false);
    setValidAddress(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (address) {
      console.log('HI');
      const isValid = library.utils.isAddress(address);
      setValidAddress(isValid);
      setSubmitted(true);
      if (isValid) navigate(`/plants?address=${address}`);
    } else {
      navigate('/plants');
    }
  };

  if (!active) return <RequestAccess />;

  return (
    <>
      <form onSubmit={submit}>
        <FormControl>
          <InputGroup mb={3}>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            ></InputLeftElement>
            <Input
              isInvalid={false}
              value={address}
              onChange={handleAddressChange}
              placeholder="Buscar por dirección"
            />
            <InputRightElement width="5.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Buscar
              </Button>
            </InputRightElement>
          </InputGroup>
          {submitted && !validAddress && (
            <FormHelperText>Dirección invalida</FormHelperText>
          )}
        </FormControl>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns="repeat(auto-fill,minmax(250px,1fr))" gap={6}>
          {plants?.map(({ name, image, tokenId }) => {
            return (
              <Link to={`/plant/${tokenId}`} key={tokenId}>
                <PlantCard name={name} image={image} />
              </Link>
            );
          })}
        </Grid>
      )}
    </>
  );
};
