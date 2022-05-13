import { useClipboard } from '@chakra-ui/hooks';
import Icon from '@chakra-ui/icon';
import { useToast } from '@chakra-ui/toast';
import { Tooltip } from '@chakra-ui/tooltip';
import React, { useEffect } from 'react'
import { AiOutlineCopy } from 'react-icons/ai';

export default function CopyClipboard({ value }) {
   const { hasCopied, onCopy } = useClipboard(value, { format: "text/plain" });
   const toast = useToast();

    useEffect(() => {
        if (!hasCopied) return; 
        
        toast({
            title: 'Copied!',
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top'
        })
    }, [hasCopied])

   return (
    <Icon cursor="pointer" userSelect="none" onClick={onCopy} as={AiOutlineCopy} fontSize="xl" />
   )
}