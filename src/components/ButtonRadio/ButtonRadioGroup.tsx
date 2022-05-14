import {
  Box,
  Container,
  Stack,
  useRadioGroup,
  UseRadioGroupProps,
  HStack,
  Button,
  IconButton,
  Heading,
  Icon,
  Wrap,
} from "@chakra-ui/react";
import { useTags } from "contexts/tags/use-tags";
import * as React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { ButtonRadio } from "./ButtonRadio";
import { BiReset } from "react-icons/bi";
import Loader from "components/loader/loader";
import { useProducts } from "contexts/products/use-products";

interface ButtonRadioGroupProps extends UseRadioGroupProps {
  options: Array<{
    label: string;
    // value: string
    id: string;
    description: string;
    icon: React.ReactElement;
  }>;
}

export const ButtonRadioGroup = (props: ButtonRadioGroupProps) => {
  const { options, ...rest } = props;
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);
  const { isTagsLoading, tags, onAppendTag, selectedTags, onSetSelectedTags } =
    useTags();
  const { isLoading: isProductsLoading } = useProducts();

  const handleNextButton = () => {
    if (!value) return;

    const selectedOption = options.find(option => option.id === value);

    if (!selectedOption?.id) return;
    onAppendTag({ id: parseInt(selectedOption.id) });
  };

  const handleBackButton = () => {
    const selectedTagsArray = [...selectedTags];
    selectedTagsArray.pop();

    onSetSelectedTags(selectedTagsArray);
  };

  const handleResetTags = () => {
    onSetSelectedTags([]);
  };

  return (
    <Stack align="center" spacing="6">
      {(isProductsLoading === false || isTagsLoading === false) &&
        (tags.length === 0 ? (
          <Heading textAlign="center" fontStyle="italic" mb="-4">
            Αυτές είναι οι ιδανικές προτάσεις για σένα!
          </Heading>
        ) : (
          <Heading mb="4" textAlign="center">
            Επίλεξε τον τύπο της επιδερμίδας σου
          </Heading>
        ))}
      {/* <Heading mb="4">{tags.length === 0 ? `Here is what are you looking for` : `Choose your skin consern`}</Heading> */}
      {isTagsLoading || isProductsLoading ? (
        <Container centerContent py="4">
          <Loader />
        </Container>
      ) : (
        <>
          <Wrap
            // justify="flex-start"
            // align="flex-start"
            justify="center"
            align="center"
            // direction={{ base: 'column', md: 'row' }}
            spacing="3"
            {...getRootProps()}
          >
            {options.map(option => (
              <ButtonRadio
                key={option.id}
                icon={option.icon}
                description={option.description}
                label={option.label}
                {...getRadioProps({ value: option.id })}
              />
            ))}
          </Wrap>
          {tags.length === 0 ? (
            <Button
              leftIcon={<Icon color="white" fontSize="18" as={BiReset} />}
              w="8rem"
              variant="outline"
              _hover={{
                bg: "transparent",
                borderColor: "#EA870E",
              }}
              _active={{ bg: "transparent" }}
              _focus={{ boxShadow: "none" }}
              onClick={handleResetTags}
            >
              Reset
            </Button>
          ) : (
            <HStack spacing="4">
              {selectedTags.length > 0 && (
                <IconButton
                  icon={<IoIosArrowBack />}
                  fontSize="20"
                  aria-label="Back Button"
                  variant="outline"
                  _hover={{
                    bg: "transparent",
                    borderColor: "#EA870E",
                  }}
                  _active={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={handleBackButton}
                />
              )}
              {tags.length > 0 && (
                <Button
                  w="8rem"
                  variant="outline"
                  _hover={{
                    bg: "transparent",
                    borderColor: "#EA870E",
                  }}
                  _active={{ bg: "transparent" }}
                  _focus={{ boxShadow: "none" }}
                  onClick={handleNextButton}
                >
                  Next
                </Button>
              )}
            </HStack>
          )}
        </>
      )}
    </Stack>
  );
};
