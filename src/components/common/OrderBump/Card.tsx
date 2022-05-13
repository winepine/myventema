import { Box, HStack, Square,  Wrap, Stack, Heading, Link, Text, WrapItem } from '@chakra-ui/layout'
import { Image, Button } from '@chakra-ui/react';
import { useCart } from 'contexts/cart/use-cart';
import useProductLink from 'hooks/useProductLink';
import React from 'react'
import { CartIcon } from 'assets/icons/CartIcon';

const BumpCard = ({ product }) => {
  const { addItem } = useCart();
  const { categorySlug, productSlug } = useProductLink(product);

  return (
    <Box p="4" bg="white" border="1px" borderColor="gray.300" rounded="md">
      <HStack>
        <Square size="4rem">
          <Image 
            src={product.images?.[0]?.src}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Square>
        <Wrap pl="4" spacing="4" w="full" justify="space-between">
          <Stack spacing="4">
            <Heading noOfLines={1} fontSize="18" fontWeight="semibold">
              <Link href={`/${categorySlug}/${productSlug}`}>
                <a>{product.name}</a>
              </Link>
            </Heading>
            <Wrap spacing={{ base: "2", md: "4" }}>
              <Text fontSize="18" fontWeight="semibold">
                {"€ "}
                {product.sale_rice ? product.sale_price : product.regular_price}
              </Text>
              <Button 
                size="sm"
                onClick={() => addItem(product)}
                leftIcon={<CartIcon mr={2} />}
                bg="#FD5A89"
                color="white"
                _hover={{  
                  bg: '#FD5A89',
                  color: "white"
                }}
                _active={{  
                  bg: '#FD5A89',
                  color: "white"
                }}
              >
                Προσθήκη στο καλάθι
              </Button>
            </Wrap>
          </Stack>
          {/* <WrapItem justifyContent="center" alignItems="center">
          </WrapItem> */}
        </Wrap>
      </HStack>
    </Box>
  )
}

export default BumpCard
