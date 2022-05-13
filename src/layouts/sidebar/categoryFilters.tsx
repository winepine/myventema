import React, { Fragment } from 'react'
import { Button, chakra, Heading, Icon, Input, Stack, Wrap } from '@chakra-ui/react'
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';

import { Box as ChakraBox, HStack, Text, Checkbox } from '@chakra-ui/react'
import { FC } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr'
import { useState } from 'react';
import Router from 'next/router'
import WooCommerce from 'lib/woocommerce';
import useActiveAttributeFilets from 'hooks/useActiveFilters';

interface Props {
  subCategories?: any
  categoryName?: string
  attributes?: any[]
}

const CategoryFilters:FC<Props> = ({ attributes, categoryName, subCategories }) => {
  const router = useRouter();
  const { activeFilter } = useActiveAttributeFilets();



  return (
    <ChakraBox color="black" w="100%">
      {/* Header */}
      <ChakraBox fontSize="sm" w="full" bg="white" p="2" rounded="lg">
        <HStack justify="space-between" w="full">
          <HStack cursor="pointer" userSelect="none" spacing={0} onClick={() => router.push("/")} >
            <Icon fontSize="20" as={HiChevronLeft} />
            <Text fontSize="inherit" color="black" >Αρχική Σελίδα</Text>
          </HStack>
          <HStack pr="5">
            <Text color="black" fontSize="sm">{categoryName}</Text>
          </HStack>
        </HStack>
      </ChakraBox>

      {/* Body */}
      <ChakraBox fontSize="sm" w="full" bg="white" rounded="lg" mt="2" p="3">

        {/* Subcategories */}
        <Stack spacing="4" minH="80vh">
          {(subCategories && subCategories.length > 0) && <Stack spacing="0">
            <Text fontWeight="bold" fontSize="md" color="black" mb="1">Υποκατηγορίες</Text>
            {subCategories.map((category: any, idx: number) => {
              if (!category.count) return null; // No need to display category that has zero/null product
              return (
                <Fragment key={idx.toString()}>
                  <Link href={`/${category.slug}`}>
                    <a>
                      <TextWrapper key={idx.toString()}>{category.name} <Text color="gray.500" ml="1" as="span" fontSize="14">{`(${category.count})`}</Text></TextWrapper>
                    </a>
                  </Link>
                </Fragment>
              )
            })}
          </Stack>}

          {attributes.length > 0 && <Stack spacing="0">
            <Stack spacing="4">
              {attributes.map((attr: any, idx: number) => {
                return (
                  <Stack spacing="0" key={attr.attribute.id}>
                    <Text fontWeight="bold" fontSize="md" color="black" mb="1">{attr.attribute.name}</Text>
                    {attr.attributeTerms.map((attrTerm: any, idx: number) => {
                      // console.log({ attribute: attr.attribute.slug, attributeTerm: attrTerm.id })

                      return (
                        <HStack key={attrTerm.id}>
                          <Text fontWeight={activeFilter[0]?.name === attrTerm.name ? "bold" : "normal"} fontSize="14" key={idx.toString()}>
                            {/* <Link href={{ query: { ...router.query, filter_availability: decodeURI(attr.slug) } }} shallow scroll> */}
                            <Link href={{ query: { ...router.query, attributeId: attr.attribute.id, attribute: decodeURI(attr.attribute.slug), attributeTerm: attrTerm.id } }} scroll shallow>
                              <a>{attrTerm.name}</a>
                            </Link>
                            {/* {attrTerm.name} */}
                          </Text>
                        </HStack>
                      )
                    })}
                  </Stack>
                )
              })}
            </Stack>
          </Stack>}

        </Stack>
      </ChakraBox>
    </ChakraBox>
  )
}

interface TextWrapperProps {
  onClick?: any
  cursor?: string
}
const TextWrapper:FC<TextWrapperProps> = ({ children, onClick, cursor }) => {
  return (
    <Text cursor={cursor} userSelect="none" fontSize="sm" color="black" onClick={onClick}>{children}</Text>
  )
}

export default CategoryFilters
