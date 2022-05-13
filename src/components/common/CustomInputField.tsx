import React, { forwardRef, Ref } from 'react';
import { 
    Input, 
    InputProps, 
    SimpleGrid, 
    Stack, 
    InputGroup, 
    InputRightElement, 
    Icon, 
    FormLabel, 
    FormControl,
    Wrap,
    HStack,
    Text,
    Checkbox,
    Box as ChakraBox,
    Fade,
    ScaleFade
  } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface CustomInputFieldProps extends InputProps {
    label?: string
    isRequired?: boolean
    IconRight?: IconType
    error?: any
}

const CustomInputField = forwardRef<HTMLInputElement, CustomInputFieldProps>(({ error, label, isRequired=false, IconRight, ...restProps }, ref) => {
    return (
        <FormControl>
            {!!label && <FormLabel fontSize="sm" mt="3">{label} {isRequired && <ChakraBox as="span" color="red">*</ChakraBox>}</FormLabel>}
            <InputGroup>
            <Input ref={ref} rounded="base" {...restProps}/>
            {IconRight && <InputRightElement 
                pointerEvents="none"
                children={<Icon as={IconRight} color="gray.400" />}
            />}
            </InputGroup>
            {!!error && <Text textColor="crimson" m="1" fontWeight="medium">{error}</Text>}
        </FormControl>
    )
})

export default CustomInputField