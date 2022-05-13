import React, { useState } from 'react';
import { SEO } from 'components/seo';
import OrderReceived from 'features/order-received/order-received';
import { useCart } from 'contexts/cart/use-cart';
import { useEffect } from 'react';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const OrderReceivedPage = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);


    const orderFromLocalStorage = JSON.parse(localStorage.getItem("order"));
    setOrder(orderFromLocalStorage ?? {})

    // setTimeout(() => {
      setLoading(false);
    // }, 300);
  }, [])

  // console.log({ order })


  if (!loading && Object.keys(order).length === 0 ) return (
    <Box pt="24" h="80vh">
      <Container maxW="container.lg" centerContent mt="5">
        <Alert status="warning" w="max">
          <AlertIcon />
          <Text fontWeight="semibold">
            You have no order on pending!
          </Text>
        </Alert>
      </Container>
    </Box>
  );

  return (
    <>
      <NextSeo title="Order Received - All4Skin" />
      <OrderReceived order={order} />
    </>
  );
};

export default OrderReceivedPage;
