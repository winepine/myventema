import { Box, Button, Flex, Heading, HStack, Icon, Img, Stack, Text, Wrap } from '@chakra-ui/react'
import * as React from 'react'
import Banner from '../../../public/assets/images/banner/buying-guide.jpg'
import Image from 'next/image'

import { BiReset } from 'react-icons/bi';
import Router from 'next/router';
import {  } from 'react-icons/md'

const App = () => {
  return (
    <Box bg="gray.800" as="section" h="full" position="relative">
      <Box py={{ base: "10", md: "14" }} position="relative" zIndex={1}>
        <Flex justify={"center"} maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Stack align="center">
            <Heading color="white" mb="4" textAlign="center">
              Δοκιμάστε τον βοηθό αγοράς
            </Heading>
            <Button
              // alignSelf="center"
              size="lg"
              // leftIcon={<Icon fontSize="18" as={MdFaceRetouchingNatural}/>}
              w="max"
              // variant="outline"
              _hover={{ 
                bg: "primary",
                borderColor: '#FD5A89',
              }} 
              // _active={{ bg: "transparent" }} 
              _focus={{ boxShadow: 'none' }}
              onClick={() => Router.push("/buying-guide")}
              // onClick={handleResetTags}
            >
              Βοηθός Αγοράς
            </Button>
          </Stack>
        </Flex>
      </Box>
      <Flex
        id="image-wrapper"
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <Box w="full" h="full" position="absolute">
            <Box w="full" h="full" position="relative">
              <Image
                src={Banner}
                alt="Main Image"
                layout="fill"
                // w="full"
                // h="full"
                objectFit="cover"
                quality={30}
                // objectPosition="top bottom"
                // position="absolute"
              />
            </Box>
          </Box>
          <Box position="absolute" w="full" h="full" bg="blackAlpha.300" />
        </Box>
      </Flex>
    </Box>
  )
}

export default App