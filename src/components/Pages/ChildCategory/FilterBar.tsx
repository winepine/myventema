import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import { Box, Wrap, Text, TextProps, HStack, InputGroup, InputLeftElement, Icon, Input, Select } from '@chakra-ui/react'
import { BsGrid } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'
import router, { useRouter } from 'next/router'

interface Props {
  count?: number
}
const FilterBar:FC<Props> = ({ count }) => {
  // Commints

  const router = useRouter();
  const [value, setValue] = useState("popularity");

  useEffect(() => {
    const { orderby, order, ...rest } = router.query;
    if (orderby === "popularity") {
      setValue("popularity")
    } else if (orderby === "price" && order === "desc") {
      setValue("highToLow")
    } else if (orderby === "price" && order === "asc") {
      setValue("lowToHigh")
    } else if (orderby === "date") {
      setValue("newProducts")
    }
  }, [])
  
  const handleOrderBy = (value) => {
    const { orderby, order, ...rest } = router.query;
    
    setValue(value);

    if (value === "popularity") {
      router.push({ pathname: router.pathname, query: { ...rest, orderby: "popularity" } }, {}, { shallow: true, scroll: true })
    } else if (value === "highToLow") {
      router.push({ pathname: router.pathname, query: { ...rest, orderby: "price", order: "desc" } }, {}, { shallow: true, scroll: true }) // highToLow
    } else if (value === "lowToHigh") {
      router.push({ pathname: router.pathname, query: { ...rest, orderby: "price", order: "asc" } }, {}, { shallow: true, scroll: true }) // lowToHigh
    } else if (value === "newProducts") {
      router.push({ pathname: router.pathname, query: { ...rest, orderby: "date" } }, {}, { shallow: true, scroll: true })
    }
  }

  return (
    <Box bg="#f9f9f9" as="section" w="full" py="3" px="5"  shadow="sm" rounded="md">
      <Wrap justify="space-between">
        <HStack spacing="1">
          <TextWrapper fontWeight="bold">{count}</TextWrapper>
          <TextWrapper>Προϊόντα</TextWrapper>
        </HStack>
        <HStack>
          {/* <Select w="16rem" rounded='sm' size="md" type="tel" placeholder="Ταξινόμηση κατά Δημοφιλία"> */}
          <Select value={value} onChange={(e) => handleOrderBy(e.currentTarget.value)} w="16rem" rounded='sm' size="md" type="tel">
            <option value="popularity">Ταξινόμηση κατά Δημοφιλία</option>
            <option value="highToLow">Φθίνουσα σειρά</option>
            <option value="lowToHigh">Αύξουσα σειρά</option>
            <option value="newProducts">Νέα προϊόντα</option>
          </Select>
        </HStack>
      </Wrap>
    </Box>
  )
}

interface TextWrapperProps extends TextProps {}
const TextWrapper:FC<TextWrapperProps> = ({ children, ...restProps}) => {
  return (
    <Text fontSize="md" color="black" {...restProps}>{children}</Text>
  )
}

export default FilterBar
