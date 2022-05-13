import React, { useRef } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Icon,
  HStack,
} from "@chakra-ui/react"
import { MdClose } from 'react-icons/md';
import Logo from 'layouts/logo/logo';
import LogoImage from '../../../public/assets/images/logo/all4skin.png';

const ChakraDrawer = ({ isOpen, onClose, children }) => {
  const btnRef = useRef()

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent bg="#f9f9f9">
          <DrawerHeader position="relative">
            <HStack align="center" justify="center">
              <Logo
                isDesktopView={true}
                imageUrl={LogoImage}
                alt={'Shop Logo'}
              />
              <Icon position="absolute" right="10" cursor="pointer" userSelect="none" onClick={() => onClose()} as={MdClose} fontSize="24" />
            </HStack>
          </DrawerHeader>

          <DrawerBody my="4">
            <div>
              {children}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ChakraDrawer