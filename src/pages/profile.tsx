import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import ErrorMessage from 'components/error-message/error-message';
import useUser from 'data/use-user';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import useAuthLoading from 'hooks/useAuthLoading';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import AuthLoading from 'components/common/AuthLoading';
import Loader from 'components/loader/loader';
import { NextSeo } from 'next-seo'

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  const { loading, show } = useAuthLoading();
  const { user, error } = useUser();

  {/* Main content */}
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <div>loading...</div>;

  if (!loading && !show) return (
    <AuthLoading />
  )

  if (!loading && show) return (
    <>
      <NextSeo title="Ο Λογαριασμός μου - All4Skin" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <ContentBox>
            <SettingsContent deviceType={deviceType} />
          </ContentBox>
        </PageWrapper>
      </Modal>
    </>
  );

  return<>
    <NextSeo title="Loading..." />
    <Container py="24" h="80vh" centerContent>
      <Loader />
    </Container>;
  </> 
};

export default ProfilePage;
