import React, { useEffect, useState } from 'react';
import { SearchBox } from 'components/search-box/search-box';
import { useAppState, useAppDispatch } from 'contexts/app/app.provider';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Box } from '@chakra-ui/react'
import FloatItems from 'components/common/FloatItems';
import { useMedia } from 'utils/use-media';
import { Input as ChakraInput, HStack, Button, InputGroup, InputRightElement, Icon } from '@chakra-ui/react'
import { FaCross, FaSearch, FaTelegram, FaTimes } from 'react-icons/fa';

interface Props {
  minimal?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
  const searchTerm = useAppState('searchTerm');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const intl = useIntl();
  const [searchInput, setSearchInput] = useState("");
  const desktop = useMedia('(min-width: 992px)');
  const [searchQuery, setSearchQuery] = useState("");

  const handleOnChange = (e) => {
    const value = e.currentTarget.value;

    if (!value) {
      setSearchQuery("");
      return;
    };

    setSearchQuery(value)
  }

  return (
    <Box flex="1" mr="8" position="relative">
      <InputGroup>
        <ChakraInput 
          bg="#f9f9f9"
          placeholder="Αναζήση προϊόντων"
          _placeholder={{ fontSize: { base: "14", md: "16" } }}
          rounded="md"
          _focus={{ borderColor: "#FD5A89", outline: "none" }}
          size="lg"
          value={searchQuery}
          onChange={handleOnChange} 
        />
        <InputRightElement  
          h="full"
          children={
            searchInput ? <Icon cursor="pointer" userSelect="none" as={FaTimes} onClick={() => setSearchInput("")} fontSize="22" mr="6" color="#FD5A89" /> :
            <Icon  as={FaSearch} fontSize="22" mr="6" color="gray" />
          } 
        />
      </InputGroup>
      {!!searchQuery && <Box w="100%" bg="white" p="2" border="0.5px" rounded="md" shadow="base" mr="3"  right="0" top="100%" my="1" position="absolute">
        <FloatItems 
          searchQuery={searchQuery}
          onSubmit={onSubmit}
          onChangeSearchQuery={(query) => setSearchQuery(query)}
        />
      </Box>}
    </Box>
  );
};

export default Search;
