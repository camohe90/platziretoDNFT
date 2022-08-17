import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlantCard } from '../../components/plant-card';
import { usePlantData } from '../../hooks/usePlantsData';
import { useParams } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import Loading from '../../components/loading';
import RequestAccess from '../../components/request-access';
import { useContract } from '../../hooks/useContract';
import { UploadAndDisplayImage } from '../../components/Images';
import { uploadFile } from '../../utils/uploadIPFS';
import { Formik, Form, Field } from 'formik';
const PINATA_ENDPOINT = 'https://gateway.pinata.cloud/ipfs/';

export const Plant = () => {
  const { active, account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { plant, loading, update } = usePlantData(tokenId);
  const toast = useToast();
  const [transfering, setTransfering] = useState(false);
  const plantContract = useContract();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState();

  const transfer = () => {
    setTransfering(true);
    const address = prompt('Ingrese la dirección');

    const isAddress = library.utils.isAddress(address);
    if (!isAddress) {
      toast({
        title: 'Dirección invalida',
        description: 'La dirección no es una dirección de ethereum',
        status: 'error',
      });
      setTransfering(false);
    } else {
      plantContract.methods
        .safeTransferFrom(plant.owner, address, plant.tokenId)
        .send({ from: account })
        .on('error', () => {
          setTransfering(false);
        })
        .on('transactionHash', (txHash) => {
          toast({
            title: 'Transacción enviada',
            description: txHash,
            status: 'info',
          });
        })
        .on('receipt', () => {
          setTransfering(false);
          toast({
            title: 'Transacción confirmada',
            description: `El punk ahora pertenece a ${address}`,
            status: 'success',
          });
          update();
        });
    }
  };

  const changeData = async (values, actions) => {
    console.log(values);
    console.log(imageFile);
    if (!imageFile) {
      toast({
        title: 'No imagen',
        description: 'Debes seleccionar una imagen',
        status: 'error',
      });
      return;
    }
    const hashImage = await uploadFile(imageFile);
    const atrributesArray = [];
    const objectJson = {
      name: values.name,
      description: values.description,
      image: `${PINATA_ENDPOINT}${hashImage}`,
      atrributes: atrributesArray,
    };

    const fd = new File([JSON.stringify(objectJson)], 'metadata.json', {
      type: 'application/json',
    });
    const hashJson = await uploadFile(fd);
    plantContract.methods
      .updateNFT(tokenId, `${PINATA_ENDPOINT}${hashJson}`)
      .send({
        from: account,
      })
      .on('transactionHash', (txHash) => {
        toast({
          title: 'Transacción enviada',
          description: txHash,
          status: 'info',
        });
        onClose();
      })
      .on('receipt', () => {
        toast({
          title: 'Transacción confirmada',
          description: 'Nunca pares de aprender',
          status: 'success',
        });
        update();
      })
      .on('error', (error) => {
        toast({
          title: 'Transacción fallida',
          description: error.message,
          status: 'error',
        });
      });
  };

  const handleImage = (file) => {
    setImageFile(file);
  };

  const validateField = (value) => {
    let error;
    if (!value) {
      error = 'El campo es requerido';
    }
    return error;
  };

  if (!active) return <RequestAccess />;
  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack>
        <PlantCard
          mx={{
            base: 'auto',
            md: 0,
          }}
          name={plant.name}
          image={plant.image}
        />
        <Button
          disabled={account !== plant.owner}
          colorScheme="green"
          isLoading={transfering}
          onClick={transfer}
        >
          {account !== plant.owner ? 'No eres el dueño' : 'Transferir'}
        </Button>
        <Button
          disabled={account !== plant.owner}
          colorScheme="green"
          isLoading={transfering}
          onClick={onOpen}
        >
          {account !== plant.owner
            ? 'No eres el dueño'
            : 'Cambiar la metadata!'}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{plant.name}</Heading>
        <Text fontSize="xl">{plant.description}</Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {plant.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Atributo</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {plant.atrributes?.map((atr) => (
              <Tr key={atr['trait-type']}>
                <Td>{atr['trait-type']}</Td>
                <Td>
                  <Tag>{atr['value']}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cambiar la metadata</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{ name: '', description: '', image: '' }}
              onSubmit={changeData}
            >
              {(props) => (
                <Form>
                  <Field name="name" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Nombre</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description" validate={validateField}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.description && form.touched.description
                        }
                      >
                        <FormLabel>Descripción</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.description}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <FormLabel mt={10}>Imagen</FormLabel>
                  <UploadAndDisplayImage setImage={handleImage} />
                  <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
