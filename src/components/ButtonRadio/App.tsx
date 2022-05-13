import { Badge, Box, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'
import { HiBriefcase, HiCursorClick } from 'react-icons/hi'
import { ButtonRadioGroup } from './ButtonRadioGroup'

const ButtonRadio = ({ options }) => {
  return (
    <Box w="max" display="flex" justifyContent="flex-start">
      <ButtonRadioGroup
        // defaultValue={""}
        options={options}
      />
    </Box>
  )
}

export default ButtonRadio
