import React from 'react';
import Router from 'next/router';
import { LogoBox, LogoImage, LogoImageMobile } from './logo.style';
import { useMedia } from 'utils/use-media';
type LogoProps = {
  imageUrl: string;
  alt: string;
  onClick?: () => void;
  isDesktopView?: boolean
};

const Logo: React.FC<LogoProps> = ({ imageUrl, alt, onClick }) => {
  const desktop = useMedia('(min-width: 992px)');

  function onLogoClick() {
    Router.push('/');
    if (onClick) {
      onClick();
    }
  }
  return (
    <>
      <LogoBox onClick={onLogoClick}>
        <LogoImage src={imageUrl} alt={alt} />
      </LogoBox>
    </>
  );
};

export default Logo;
