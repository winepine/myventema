import React, { useState } from 'react';
import {
  WalkerWrapper,
  Category,
  NoCategory,
  CategoryWrapper,
} from './category-walker.style';
import { Button } from 'components/button/button';
import SpringModal from 'components/spring-modal/spring-modal';
import router, { NextRouter, useRouter } from 'next/router';
import startCase from 'lodash/startCase';
import { MdClose } from 'react-icons/md';
import { filter, Icon as ChakraIcon, Wrap} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';
import useActiveAttributeFilets from 'hooks/useActiveFilters';

type WalkerProps = {
  parent?: string;
  child?: string;
  style?: any;
  isSpringModalOpen?: boolean
  onIsMenuOpenClick?: any
  setIsOpen?: any
  // onClick: () => void;
};

function decorateActiveFilter(name, value) {
  let decoratedFilter = { name, value }

  // console.log({ decoratedFilter })

  // if (name === "orderby" && value === "price") {
  //   decoratedFilter = { name, value: `Minimum ${value}€` }
  // } 

  if (name === "min_price") {
    decoratedFilter = { name, value: `Minimum ${value}€` }
  }
  if (name === "max_price") {
    decoratedFilter = { name, value: `Maximum ${value}€` }
  }
  if (value === "άμεσα-διαθέσιμο") {
    decoratedFilter = { name, value: 'Immediately available' }
  }
  if (value === "εξαντλημένο") {
    decoratedFilter = { name, value: 'Exhausted' }
  }
  if (value === "κατόπιν-παραγγελίας") {
    decoratedFilter = { name, value: 'Upon Order' }
  }
  if (value === "παράδοση-1-3-εργάσιμες") {
    decoratedFilter = { name, value: 'Delivery 1-3 working days' }
  }
  if (value === "παράδοση-σε-4-10-εργάσιμες") {
    decoratedFilter = { name, value: 'Delivery in 4-10 working days' }
  }

  return decoratedFilter;
}

const CategoryWalker: React.FunctionComponent<WalkerProps> = ({
  children,
  style,
  setIsOpen
}) => {
  const router = useRouter();
  const { isOpen, onModalOpen, onModalClose } = useSpringModal();
  const { removeActiveFilter, activeFilter } = useActiveAttributeFilets();

  const _filters = Object.keys(router.query).filter(param => param !== 'category');
  const filters = _filters.filter(param => param !== 'attributeId' && param !== 'attribute' && param !== 'attributeTerm');

  // console.log({ activeFilter });

  return (
    <WalkerWrapper style={style}>
      <CategoryWrapper>
        <Wrap>
        {activeFilter.map((current: any, idx: number) => {
          if (!current.name) return; 

          return (
            <Category key={idx.toString()}>
              {current.name}
              <ChakraIcon as={MdClose} onClick={() => removeActiveFilter()} ml="2" fontSize="16" alignSelf="center" justifySelf="center" />
            </Category>
          )
        })}  
        {/* {activeFilter.name && <Category>
          {activeFilter.name}
          <ChakraIcon as={MdClose} onClick={() => removeActiveFilter()} ml="2" fontSize="16" alignSelf="center" justifySelf="center" />
        </Category>} */}
        {/* {filters.length > 0 ? filters.map((filter: any, idx: number) => (
          <Category key={idx.toString()}>
            {decorateActiveFilter(filter, router.query[filter]).value}
            <ChakraIcon as={MdClose} onClick={() => removeActiveFilter()} ml="2" fontSize="16" alignSelf="center" justifySelf="center" />
          </Category>
        )) : <NoCategory>Δεν έχει επιλεχθεί κανένα φίλτρο</NoCategory>} */}
        </Wrap>
      </CategoryWrapper>
      <Button variant="text" onClick={() => setIsOpen(true)}>
        Φίλτρα
      </Button>
    </WalkerWrapper>
  );
};

export default CategoryWalker;
