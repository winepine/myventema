import styled from 'styled-components';
import css from '@styled-system/css';
import { maxHeight } from 'styled-system';

export const LogoBox = styled.span(
  css({
    color: 'text.bold',
    fontSize: 26,
    fontWeight: 'bold',
    cursor: 'pointer',
    mr: [0, 20, 40],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const LogoImage = styled.img({
  display: 'block',
  backfaceVisibility: 'hidden',
  maxWidth: 150,
  maxHeight: 80,
  left: 50,
  // position: "absolute",
});

export const LogoImageMobile = styled.img({
  display: 'block',
  backfaceVisibility: 'hidden',
  maxWidth: 150,
  maxHeight: 80,
  left: '50%',
  right: '50%',
  transform: 'translateX(-50%)',
  position: "absolute",
});
