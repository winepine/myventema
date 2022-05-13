import React from 'react';
import Router, { useRouter } from 'next/router';
import { openModal } from '@redq/reuse-modal';
import { AuthContext } from 'contexts/auth/auth.context';
import AuthenticationForm from 'features/authentication-form';
import { RightMenu } from './menu/right-menu/right-menu';
import { LeftMenu } from './menu/left-menu/left-menu';
import HeaderWrapper from './header.style';
// import LogoImage from 'assets/images/logo.svg';
import LogoImage from '../../../public/assets/images/logo/all4skin.png';
import UserImage from '../../../public/assets/images/all4skinavatar.jpg';
import { isCategoryPage } from '../is-home-page';
import Search from 'features/search/search';
import { Box } from "@chakra-ui/react"
import { useMedia } from 'utils/use-media';

type Props = {
  categories?: any[]
  className?: string;
};
const Header: React.FC<Props> = ({ categories, className }) => {
  const mobile = useMedia('(max-width: 580px)');
  const tablet = useMedia('(max-width: 991px)');
  const desktop = useMedia('(min-width: 992px)');
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);
  const { pathname, query } = useRouter();
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('customer');
      authDispatch({ type: 'SIGN_OUT' });
      Router.push('/');
    }
  };

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
        zIndex: 999
      },
    });
  };
  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu categories={categories} logo={LogoImage} />
      <Search />
      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;
