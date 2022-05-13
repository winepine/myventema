import React from 'react';
import { Alert, AlertIcon, Box, Container, Text } from '@chakra-ui/react';
import { Modal } from '@redq/reuse-modal';
import { openModal } from '@redq/reuse-modal';
import { useContext } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';
import { NextSeo } from 'next-seo'
import AuthenticationForm from 'features/authentication-form';

const AuthLoading = () => {
  const { authState, authDispatch } = useContext<any>(AuthContext);

  const handleJoin = () => {
    authDispatch({
      type: 'SIGNIN',
    });

    openModal({
      show: true,
      overlayClassName: 'quick-view-overlay',
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: '',
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'quick-view-modal',
        width: 458,
        height: 'auto',
      },
    });
  }

  return (
    <>
    <NextSeo title="Ο Λογαριασμός μου - All4Skin" />
    <Modal>
      <Box pt="24" h="80vh">
        <Container maxW="container.lg" centerContent mt="5">
          <Alert status="warning" w={{ base: "full", md: "max"}}>
            <AlertIcon />
            <Text fontWeight="semibold">
              Δεν έχετε κάνει σύνδεση!
              <Text cursor="pointer" onClick={handleJoin} userSelect="none"  as="span" ml="2" align="center" textDecor="underline" fontStyle="italic">
                Πατήστε εδώ για να συνδεθείτε
              </Text>
            </Text>
          </Alert>
        </Container>
      </Box>
    </Modal>
    </>
  )
}

export default AuthLoading
