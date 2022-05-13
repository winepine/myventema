import React from 'react';
import Router, { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import Popover from 'components/popover/popover';
import Logo from 'layouts/logo/logo';
import { MenuDown } from 'assets/icons/MenuDown';
import { CATEGORY_MENU_ITEMS } from 'site-settings/site-navigation';
import * as categoryMenuIcons from 'assets/icons/category-menu-icons';
import {
  MainMenu,
  MenuItem,
  IconWrapper,
  SelectedItem,
  // Icon,
  Arrow,
  LeftMenuBox,
} from './left-menu.style';
import { BiMenu } from 'react-icons/bi';
import { Icon, useDisclosure, Box as ChakraBox, HStack, Text } from '@chakra-ui/react';
import ChakraDrawer from 'layouts/ChakraDrawer';
import styled from 'styled-components';
import { CardMenu } from 'components/card-menu';
import { HiOutlineHome } from 'react-icons/hi';

const CardMenuWrapper = styled.div({
  display: 'grid',
  gridGap: '10px',
  gridTemplateColumns: '1fr 1fr',
  gridAutoRows: 'max-content',
  paddingBottom: 20,

  '@media (min-width: 550px) and (max-width: 990px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryMenu = (props: any) => {
  const handleOnClick = (item) => {
    if (item.dynamic) {
      Router.push('/[type]', `${item.href}`);
      props.onClick(item);
      return;
    }
    Router.push(`${item.href}`);
    props.onClick(item);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'pink', padding: '20px' }}>
      {CATEGORY_MENU_ITEMS.map((item) => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <IconWrapper>
            <CategoryIcon name={item.icon} />
          </IconWrapper>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      ))}
    </div>
  );
};

type Props = {
  categories?: any[]
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ categories, logo }) => {
  const router = useRouter();
  const initialMenu = CATEGORY_MENU_ITEMS.find(
    (item) => item.href === router.asPath
  );
  const [activeMenu, setActiveMenu] = React.useState(
    initialMenu ?? CATEGORY_MENU_ITEMS[0]
  );
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const { pathname, query } = useRouter();
  const selectedQueries = query.category; 

    // console.log({ selectedQueries });

  const hideCanvasMenuShow = pathname === "/[category]" || pathname === "/";
  // console.log({ router });

  return (
    <LeftMenuBox>
      {/* Ofcanvas menu */}
      <ChakraDrawer 
        isOpen={isOpen}
        onClose={onClose}
      >
        <CardMenuWrapper>
          <CardMenu
            data={categories}
            onCheckClick={onClose}
            active={selectedQueries}
          />
        </CardMenuWrapper>
         <ChakraBox rounded="md" bg="white" w="full" py="2">
           <HStack cursor="pointer" userSelect="none" onClick={() => {
             router.push("/");
             onClose()
           }} justify="center">
            <Icon fontSize="22" as={HiOutlineHome} />
            <Text fontSize="18" fontWeight="medium">Αρχική Σελίδα</Text>
           </HStack>
         </ChakraBox>
      </ChakraDrawer>

      {!hideCanvasMenuShow && <Icon 
        as={BiMenu} 
        fontSize="28"
        mr="3" 
        cursor="pointer" 
        userSelect="none"
        onClick={() => onOpen()} 
      />}


      <Logo
        isDesktopView={true}
        imageUrl={logo}
        alt={'Shop Logo'}
        onClick={() => setActiveMenu(CATEGORY_MENU_ITEMS[0])}
      />

      {/* <MainMenu>
        <Popover
          className='right'
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <CategoryIcon name={activeMenu?.icon} />
                </Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.id}
                    defaultMessage={activeMenu?.defaultMessage}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        />
      </MainMenu> */}
    </LeftMenuBox>
  );
};
