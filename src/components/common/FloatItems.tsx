import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query'
import { Text, Container, Box, HStack, Image, Stack } from '@chakra-ui/react'
import Loader from 'components/loader/loader';
import currencyFormatter from 'currency-formatter'
import router from 'next/router';

const FloatItems = ({ onSubmit, searchQuery, onChangeSearchQuery }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    async function getAsyncData() {
      setLoading(true)

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/products?search=${searchQuery}&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`);
      setItems(data);

      setLoading(false);
    }
    getAsyncData();
  }, [searchQuery])

  // console.log({ items });
  
  
  return (
    <div>
      {loading ? <Container py="10" centerContent >
        <Loader />
      </Container> : <Stack py="2">
        {items.length > 0 ? items.map((item: any, i: number) => {
          const splitted = item.permalink.split("/");
          console.log("Search :: ", { splitted: item.permalink.split("/") })
          
          return (
            <Box 
              key={i.toString()} 
              cursor="pointer" 
              userSelect="none" 
              p="2" 
              rounded="md" 
              onClick={() => {
                router.push(`/${splitted[3]}/${splitted[4]}`);
                // onSubmit();
                // setSearchQuery("")
                onChangeSearchQuery("")
              }}
            >
              <HStack>
                <Image 
                  w="12"
                  h="12"
                  src={item.images?.[0]?.src}
                  rounded="full"
                />
                <Stack spacing="1">
                  <Text key={i.toString()}>{item.name}</Text>
                  <Text fontSize="14" color="GrayText">€ {currencyFormatter.format(item.price, { })}</Text>
                </Stack>
              </HStack>
            </Box>
          )
        }) : <Container centerContent py="3">
            No product found!
          </Container>}
      </Stack>}
    </div>
  )
}

export default FloatItems
