import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import React from 'react'

const ProductGridLoading = () => {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing="4" h="40vh">
      <Skeleton h="25rem">
        <div>contents wrapped</div>
      </Skeleton>
      <Skeleton h="25rem">
        <div>contents wrapped</div>
      </Skeleton>
      <Skeleton h="25rem">
        <div>contents wrapped</div>
      </Skeleton>
      <Skeleton h="25rem">
        <div>contents wrapped</div>
      </Skeleton>
    </SimpleGrid> 
  )
}

export default ProductGridLoading