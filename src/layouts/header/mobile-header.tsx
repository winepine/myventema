import React, { useContext, useEffect, useState } from 'react';
import router, { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import MobileDrawer from './mobile-drawer';
import styled from 'styled-components';
import { CardMenu } from 'components/card-menu';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from './header.style';
import Search from 'features/search/search';
import LogoImage from '../../../public/assets/images/logo/all4skin.png';
import { SearchIcon } from 'assets/icons/SearchIcon';
import { LongArrowLeft } from 'assets/icons/LongArrowLeft';
import MobileLogo from 'layouts/logo/mobileLogo';
import useDimensions from 'utils/useComponentSize';
import { BiMenu } from 'react-icons/bi'
import { Icon } from '@chakra-ui/react';
import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';
import SpringModal from 'components/spring-modal/spring-modal';
import { Modal } from '@redq/reuse-modal';
import { Box, Button } from '@chakra-ui/react';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';

const CardMenuWrapper = styled.div({
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: 'max-content',
  paddingBottom: 30,

  '@media (min-width: 550px) and (max-width: 990px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
  categories?: any[]
};

const SearchModal: React.FC<{}> = () => {
  const onSubmit = () => {
    closeModal();
  };
  
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit" onClick={() => closeModal()}>
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={onSubmit}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ categories, className }) => {
  const { pathname, query } = useRouter();
  const [mobileHeaderRef, dimensions] = useDimensions();
  const { isOpen, onModalOpen, onModalClose} = useSpringModal();
  const selectedQueries = query.category;
  const { authState, authDispatch } = useContext<any>(AuthContext);
 
  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };

  const showLeftDrawer = router.pathname === "/profile" || router.pathname === "/order";

  return (
    <Modal>
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        {showLeftDrawer ? <DrawerWrapper>
          {/* It open the left modal */}  
          <MobileDrawer />
        </DrawerWrapper> : <>
          {/* For categories modal */}
          <CategoryMenuModal categories={categories} />
        </>}

        <LogoWrapper >
          <MobileLogo imageUrl={LogoImage} alt="shop logo" />
        </LogoWrapper>

        <SearchWrapper
          onClick={handleSearchModal}
          className="searchIconWrapper"
        >
          <SearchIcon />
        </SearchWrapper>

      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
    </Modal>
  );
};

const CategoryMenuModal = ({ categories }) => {
  const { pathname, query } = useRouter();
  const [mobileHeaderRef, dimensions] = useDimensions();
  const { isOpen, onModalOpen, onModalClose} = useSpringModal();
  const selectedQueries = query.category;
  const { authState, authDispatch } = useContext<any>(AuthContext);

  const handleJoin = () => {
    onModalClose();

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
        zIndex: 999
      },
    });
  };

  return (
    <>
      <SpringModal isOpen={isOpen} onRequestClose={() => onModalClose()}>
        <Box position="relative">
          <CardMenuWrapper>
            {router.pathname === "/profile" ? <CardMenu
              data={categories}
              active={selectedQueries}
            /> : <CardMenu
              data={categories}
              active={selectedQueries}
            />}
          </CardMenuWrapper>
          <Box w="85%" mx="auto" position="fixed" bottom="4" left="0" right="0">
            {authState.isAuthenticated ? <Button
              shadow="lg"
              mt="6"
              bg="#FD5A89"
              color="white"
              _hover={{ bg: "#FD5A89", color: "white" }}
              _active={{ bg: "#FD5A89", color: "white" }}
              _focus={{ bg: "#FD5A89", color: "white" }}
              w="full"
              onClick={() => router.replace("/profile")}
            >
              Ο λογαριασμός μου
            </Button> : <Button
              shadow="lg"
              mt="6"
              bg="#FD5A89"
              color="white"
              _hover={{ bg: "#FD5A89", color: "white" }}
              _active={{ bg: "#FD5A89", color: "white" }}
              _focus={{ bg: "#FD5A89", color: "white" }}
              w="full"
              onClick={handleJoin}
            >
              Σύνδεση/ Εγγραφή
            </Button>}
          </Box>
        </Box>
      </SpringModal>

    <Icon as={BiMenu} fontSize="30" onClick={() => onModalOpen()} />
    </>
  )
};

export default MobileHeader;
