import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import Loader from 'components/loader/loader';

const ChakraLoading = () => {
  return (
    <Box my="20" py="2" w="max" mx="auto">
      <Loader />
    </Box>
  )
}

export default ChakraLoading
