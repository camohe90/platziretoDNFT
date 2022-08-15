import React from 'react'

import { Box, Heading, Text } from '@chakra-ui/react'

function Header (props) {
  return (
    <Box display='flex' bg='#f8fafc' borderBottom='1px' borderColor='gray.200' justifyContent='space-around' alignItems='center' paddingTop='.5rem' paddingBottom='.5rem'>
      <Heading as='a' href='/' color='#003865'>NFT Dinámico</Heading>
      <Box width='30%' display='flex' alignItems='center' justifyContent='space-between'>
        <Text as='a' href='/about' color='gray.500'> </Text>
        <Text as='a' href='/maker' color='gray.800'> </Text>
        {props.children}
      </Box>
    </Box>
  )
}

export { Header }