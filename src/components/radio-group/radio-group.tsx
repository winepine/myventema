import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: red
`;

type RadioGroupProps = {
  containerClassName?: string;
  items: any[];
  component?: (item: object, index?: number) => React.ReactNode;
  secondaryComponent?: React.ReactNode;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  items = [],
  component,
  containerClassName,
  secondaryComponent,
}) => {
  return (
    // <RadioGroupWrapper className={`radioGroup ${containerClassName}`.trim()}>
    <SimpleGrid spacing="4" columns={{ base: 1, md: 2 }}>
      {items.map(
        (item: any, index: any) => component && component(item, index)
      )}

      {secondaryComponent && secondaryComponent}
      </SimpleGrid>
    // </RadioGroupWrapper>
  );
};

export default RadioGroup;
