import React from 'react'
import { CircularProgress } from '@chakra-ui/react'

import './NFTLoading.scss'

function NFTLoading () {
  return (
    <div className='center'>
      <CircularProgress isIndeterminate color='blue.300' />
    </div>

  )
}

export { NFTLoading }
