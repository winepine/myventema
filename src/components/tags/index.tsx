import React from 'react';
import { Box as ChakraBox, Wrap, Text as ChakraText, Button as ChakraButton, HStack, Icon } from '@chakra-ui/react';
import { MdClose } from 'react-icons/md';

interface Props {
  title: string | string[],
  onTagClose?: () => void;
}

export default function Tags({ title, onTagClose }: Props) {
  if (!title) return null; 
  return (
    <ChakraBox my="6">
      <Wrap>
        <Tag 
          title={title}
          onClose={onTagClose}
        />
      </Wrap>
    </ChakraBox>
  )
}

interface TagProps {
  title: string | string[]
  onClose?: () => void;
}

function Tag({ title, onClose }: TagProps) {
  return (
    <HStack border="1px" py="1" px="2" rounded="sm" justify="center" align="center">
      <ChakraText fontWeight="semibold">{title}</ChakraText>
      <Icon 
        cursor="pointer" 
        userSelect='none' 
        as={MdClose} 
        onClick={onClose}
      />
    </HStack>
  )
}