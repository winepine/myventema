import React, { useEffect } from 'react'
// import { Heading, Box } from "@chakra-ui/react"
import { ProductGrid } from 'components/product-grid/product-grid-three';
import { Modal } from '@redq/reuse-modal';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import css from '@styled-system/css';
// import { SidebarWithCardMenu } from 'layouts/sidebar/sidebar-with-card-menu';
import { SidebarWithCardMenu } from 'layouts/sidebar/sidebar-with-card-menu';
// import GroceryImgOne from 'assets/images/banner/grocery-banner-img-one.jpg';
import GroceryImgOne from '../../../../public/assets/images/banner/grocery-banner-img-one.jpg';
import GroceryImgTwo from '../../../../public/assets/images/banner/grocery-banner-img-two.jpg';
import CloseModalOutsideClick from '../../../utils/closeModalOutsideClick'
import Tags from 'components/tags';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import { FC } from 'react';
import FilterBar from './FilterBar';
import { Box, Button, Heading, Icon, Square, Stack, Text, Wrap, Icon as ChakraIcon, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import Loader from 'components/loader/loader';
import { CategoryWrapper, WalkerWrapper, Category, NoCategory, } from 'components/category-walker/category-walker.style';
import { MdClose } from 'react-icons/md';
import Pagination from 'components/pagination';
import useActiveAttributeFilets from 'hooks/useActiveFilters';
const CartPopUp = dynamic(() => import('features/carts/cart-popup'), {
  ssr: false,
});

const PAGE_TYPE = 'grocery';

interface MainProps {
  deviceType: {
    desktop: boolean
    mobile: boolean
    tablet: boolean
  }
  categories: any
  productsData: any
  productsDataType?: "restapi" | "graphql"
  count: number
  subCategories: any
  categoryName?: string
  categoryDescription?: string
  productsLoading?: boolean
  attributes?: any[]
}
const ChildCategory:FC<MainProps> = ({ attributes, productsLoading, categoryName, categoryDescription, productsDataType="graphql", categories, subCategories, count, productsData, deviceType }) => {
  const [searchText, setSearchText] = useState<string | string[]>("");
  const router = useRouter();
  const { removeActiveFilter, activeFilter } = useActiveAttributeFilets();

  const pages = count / 36;
  const roundedPages = parseInt(pages.toString()) + 1;
  
  const pagesArray: number[] = [];
  for (let i = 0; i < roundedPages; i++) {
    pagesArray.push(i + 1);
  }

  useEffect(() => {
    console.log({ router })
  }, [router.query])

  console.log({ activeFilter })

  return (
    <Modal>
      <ContentArea>
        <SidebarWithCardMenu 
          attributes={attributes}
          sidebarLayout="childCategory" 
          type={PAGE_TYPE} 
          subCategories={subCategories}
          categoryName={categoryName}
        />
        <Box mt={{ base: "-5", sm: "-16", md: "-8", lg: "0" }}>
          <Box top="0" bg="white" px="2" py="1" mb="2" pb="2">
            <Stack mx="2" pb="1" my="4">
              <Heading as="h1" fontSize="x-large" fontWeight="semibold">{categoryName}</Heading>
              <Text fontSize="16">{categoryDescription}</Text>
              {activeFilter.map((current: any, idx: number) => {
                if (!current.name) return; 

                return (
                  <HStack display={{ base: "none", lg: "inherit" }} key={idx.toString()} bg="gray.100" px="2" py="1" w="max" rounded="md">
                    <Text fontSize="14">{current.name}</Text>
                    <ChakraIcon cursor="pointer" userSelect="none" as={MdClose} onClick={() => removeActiveFilter()} ml="2" fontSize="16" alignSelf="center" justifySelf="center" />
                  </HStack>
                )
              })}
            </Stack>
            <FilterBar count={count} />
          </Box>
          <ProductGrid loading={productsLoading} productsData={productsData} type={PAGE_TYPE} deviceType={deviceType} />
          {count > 36 && <Pagination 
            totalItems={count}
          />}
        </Box>
      </ContentArea>
      <CloseModalOutsideClick>
        <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
    </Modal>
  )
}

const ContentArea = styled.div<any>(
  css({
    overflow: 'hidden',
    padding: ['68px 0 100px', '68px 0 50px', '110px 2rem 50px'],
    display: 'grid',
    minHeight: '100vh',
    gridColumnGap: '30px',
    gridRowGap: ['15px', '20px', '0'],
    gridTemplateColumns: [
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
      '300px minmax(0, 1fr)',
    ],
    backgroundColor: '#f9f9f9',
  })
);

export default ChildCategory