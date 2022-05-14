import {
  Box,
  chakra,
  Text,
  useRadio,
  UseRadioProps,
  VStack,
  useColorModeValue as mode,
  useId,
  FormLabel,
  Stack,
  ScaleFade,
} from "@chakra-ui/react";
import { useTags } from "contexts/tags/use-tags";
import * as React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const RadioBox = chakra("div", {
  baseStyle: {
    borderWidth: "2px",
    // px: '6',
    // pt: '12',
    // pb: '8',
    borderRadius: "md",
    cursor: "pointer",
    transition: "all 0.2s",
    _focus: { shadow: "outline", boxShadow: "none" },
    bg: "white",
  },
});

const CheckboxIcon = (props: { checked: boolean }) => (
  <Box
    fontSize="xl"
    color={props.checked ? "#EA870E" : mode("white", "whiteAlpha.400")}
  >
    {props.checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
  </Box>
);

interface ButtonRadioProps extends UseRadioProps {
  icon: React.ReactElement;
  label: string;
  description: string;
}

export const ButtonRadio = (props: ButtonRadioProps) => {
  const { label, icon, description } = props;
  const { getCheckboxProps, getInputProps, getLabelProps, state } =
    useRadio(props);
  const id = useId();

  const checkedStyles = {
    // bg: mode('#EA870E', 'rgb(0 31 71)'),
    // bg: mode('#ffdee7', 'rgb(0 31 71)'),
    bg: mode("transparent", "rgb(0 31 71)"),
    // borderColor: '#393D46',
    borderColor: "#EA870E",
  };

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <FormLabel
        overflow="hidden"
        backdropFilter="blur(5px)"
        py="0"
        as="label"
        w={{ base: "100%", md: "100%" }}
        {...getLabelProps()}
      >
        <input {...getInputProps()} aria-labelledby={id} />
        <RadioBox
          bg="transparent"
          w="max"
          {...getCheckboxProps()}
          _checked={checkedStyles}
          id={id}
        >
          <VStack w="10rem" py="2">
            <VStack overflow="hidden" textAlign="center">
              <Box
                color={state.isChecked ? "#EA870E" : "white"}
                aria-hidden
                fontSize="4xl"
              >
                {icon}
              </Box>
              <Stack spacing="0">
                <Text
                  color={state.isChecked ? "#EA870E" : "white"}
                  fontWeight="extrabold"
                  fontSize="xl"
                >
                  {label}
                </Text>
                <Text
                  fontStyle="italic"
                  color={state.isChecked ? "#EA870E" : "white"}
                  fontSize="sm"
                >{`(${description})`}</Text>
              </Stack>
            </VStack>
            <CheckboxIcon checked={state.isChecked} />
          </VStack>
        </RadioBox>
      </FormLabel>
    </ScaleFade>
  );
};
