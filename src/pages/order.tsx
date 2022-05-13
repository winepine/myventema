import React from 'react';
import { NextPage } from 'next';
import { SEO } from 'components/seo';
import Order from 'features/user-profile/order/order';
import {
  PageWrapper,
  SidebarSection,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { Modal } from '@redq/reuse-modal';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import Loader from 'components/loader/loader';
import AuthLoading from 'components/common/AuthLoading';
import useAuthLoading from 'hooks/useAuthLoading';
import { NextSeo } from 'next-seo';

const OrderPage: NextPage = () => {
  const { loading, show } = useAuthLoading();

  if (!loading && !show) return (
    <AuthLoading />
  )
  
  if (!loading && show) return <Main />

  return <Container py="24" h="80vh" centerContent>
    <Loader />
  </Container>;
};

function Main() {
  return (
    <>
      <NextSeo title="Order - All4Skin" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <Order />
        </PageWrapper>
      </Modal>
    </>
  )
} 

export default OrderPage;
