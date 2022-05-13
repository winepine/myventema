import React, { useState } from 'react';
import { ProductCard } from 'components/product-card/product-card-seven';
import styled from 'styled-components';
import css from '@styled-system/css';
import ErrorMessage from 'components/error-message/error-message';
import { useRouter } from 'next/router';
import { Button } from 'components/button/loadmore-button';
import { FormattedMessage } from 'react-intl';
import { Box } from 'components/box';
// import useProducts from 'data/use-products';
import { Container, Heading, Wrap as ChakraWrap, Wrap } from '@chakra-ui/react'
import Loader from 'components/loader/loader';

const Grid = styled.div(
  css({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',

    '@media screen and (min-width: 630px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 991px)': {
      gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1200px)': {
      gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))',
    },

    '@media screen and (min-width: 1700px)': {
      gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
    },

    '@media screen and (min-width: 1900px)': {
      gridTemplateColumns: 'repeat(6, minmax(240px, 1fr))',
    },
  })
);

interface Props {
  type: string;
  loadMore?: boolean;
  fetchLimit?: number;
  style?: any;
  deviceType?: any
  productsData?: any
  loading?: boolean
}

export const ProductGrid = ({
  style,
  type,
  loadMore = true,
  fetchLimit = 16,
  deviceType,
  productsData,
  loading
}: Props) => {
  const router = useRouter();

  if (loading) return <Wrap h="100vh" justify="center" w="full">
    <Loader />
  </Wrap>

  return (
    <section>
      {/* For dummy data */}
      {/* <Grid style={style}>
        {data.length > 0 ? (data.map((product) => (
          <ProductCard deviceType={deviceType} data={product} key={product.id} />
        ))) : <ChakraWrap h="72">
          <h1>No products found...</h1>  
        </ChakraWrap>}
      </Grid> */}

      {/* For graphql data */}
      <Grid style={style}>
        {productsData.length > 0 ? (productsData.map((product) => (
          <ProductCard deviceType={deviceType} data={product} key={product.id} />
        ))) : <ChakraWrap h="72">
          <h1>No products found...</h1>  
        </ChakraWrap>}
      </Grid>

      {/* {loadMore && data?.hasMore && (
        <Box style={{ textAlign: 'center' }} mt={'2rem'}>
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="secondary"
            style={{
              fontSize: 14,
              display: 'inline-flex',
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </Box>
      )} */}
    </section>
  );
};
