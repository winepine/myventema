import React from 'react';
import { 
	InputGroup, 
	FormLabel, 
	FormControl,
	Select,
	SelectProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface CustomSelectFieldProps extends SelectProps {
	label?: string
	isRequired?: boolean
	options: string[]
}

const CustomSelectField:FC<CustomSelectFieldProps> = ({ label, isRequired=false, options, ...restProps }) => {
	return (
		<FormControl isRequired={isRequired}>
			{!!label && <FormLabel fontSize="sm" mt="3">{label}</FormLabel>}
			<InputGroup>
			<Select rounded="base" {...restProps}>
				{options.map((option: string, idx: number) => (
						<option key={idx.toString()} value={option}>{option}</option>
				))}
			</Select>
			</InputGroup>
		</FormControl>
	)
}

export default CustomSelectField