import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Sticky from 'react-stickynode';
import { useAppDispatch, useAppState } from 'contexts/app/app.provider';
import Header from './header/header';
import { LayoutWrapper } from './layout.style';
import { isCategoryPage } from './is-home-page';
const MobileHeader = dynamic(() => import('./header/mobile-header'), {
  ssr: false,
});
const Footer = dynamic(() => import('../components/footer'), {
  ssr: false,
}) 

import { ChakraProvider } from '@chakra-ui/react'
import customTheme from '../styles/chakraCustomTheme';
import VisibilitySensor from 'react-visibility-sensor'
import { useEffect } from 'react';
import { useState } from 'react';
import WooCommerce from 'lib/woocommerce';

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  token,
}) => {
  const { pathname, query } = useRouter();
  const isSticky = useAppState('isSticky')   
  const dispatch = useAppDispatch();
  const [isFooter, setIsFooter] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getAsyncData() {
      const { data: categories } = await WooCommerce.get("products/categories", { parent: 0, per_page: 20 });
      const filteredCategories = categories.filter(category => category.name !== "Uncategorized");

      setCategories(filteredCategories);
    }
    getAsyncData();
  }, [])
  
  useEffect(() => {
    dispatch({ type: 'IS_SIDEBAR_SHOW', payload: isFooter })
    dispatch({ type: 'IS_CHECKOUT_CART_SHOW', payload: isFooter })
  }, [isFooter])

  const isHomePage = isCategoryPage(query.type) || pathname === '/bakery';
  // const isHomePage = isCategoryPage(query.type) || pathname === '/';
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          categories={categories}
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          } desktop`}
        />

        <Header
          categories={categories}
          className={`${isSticky ? 'sticky' : 'unSticky'} ${
            isHomePage ? 'home' : ''
          }`}
        />
      </Sticky>
      {children}
      <ChakraProvider theme={customTheme}>
        <VisibilitySensor partialVisibility={true} onChange={(isVisible) => setIsFooter(isVisible)}>
          <div>
            <Footer />
          </div>
        </VisibilitySensor>
      </ChakraProvider>
    </LayoutWrapper>
  );
};

export default Layout;
