import React from 'react';
import dynamic from 'next/dynamic';
import NavLink from 'components/nav-link/nav-link';
import { FAQ_MENU_ITEM, PAYMENT_METHODS, PAYMENT_METHODS_MENU_ITEM } from 'site-settings/site-navigation';
import { HelpIcon } from 'assets/icons/HelpIcon';
import { RightMenuBox } from './right-menu.style';
const AuthMenu = dynamic(() => import('../auth-menu'), { ssr: false });
import { Box, HStack, Text, Icon } from '@chakra-ui/react'
import { FaTelegram } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5'
import Link from 'next/link'

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({
  onLogout,
  avatar,
  isAuthenticated,
  onJoin,
}) => {
  return (
    <RightMenuBox>
      <NavLink
        className="menu-item"
        href={FAQ_MENU_ITEM.href}
        label={FAQ_MENU_ITEM.defaultMessage}
        intlId={FAQ_MENU_ITEM.id}
        iconClass="menu-icon"
      />
      <NavLink
        className="menu-item"
        href={PAYMENT_METHODS_MENU_ITEM.href}
        label={PAYMENT_METHODS_MENU_ITEM.defaultMessage}
        intlId={PAYMENT_METHODS_MENU_ITEM.id}
        iconClass="menu-icon"
      />

      <HStack>
        <Box px="2" py="1">
          <HStack>
            <Icon fontSize="20" as={IoCall} />
            <Text fontWeight="semibold"> 
              <Text as="span" color="black" mr="2">
                <a href="tel:2114102548">21 1410 2548</a>
              </Text> 
              <Text cursor="pointer" userSelect="none" onClick={()=> window.open("https://all4skin.gr/contact-us/", "_blank")} as="span" color="black">
                  <a>| ΕΠΙΚΟΙΝΩΝΙΑ</a> 
                {/* <Link href="https://all4skin.gr/contact-us/"> */}
                  {/* <a>| ΕΠΙΚΟΙΝΩΝΙΑ</a>  */}
                {/* </Link> */}
              </Text>
            </Text>
          </HStack>
        </Box>
        <AuthMenu
          avatar={avatar}
          onJoin={onJoin}
          onLogout={onLogout}
          isAuthenticated={isAuthenticated}
        />
      </HStack>

    </RightMenuBox>
  );
};
