import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Wrap,
} from "@chakra-ui/react";
import React from "react";

import { Modal } from "@redq/reuse-modal";
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import { NextSeo } from "next-seo";

const ContactUs = ({ deviceType }) => {
  return (
    <>
      <NextSeo
        title="Επικοινωνία - Soul Parfumerie"
        description="info@all4skin.gr. Ιστοσελίδα. https://eshop.all4skin.gr/.  Leof. Alexandras 192Α, Athina 115 21. 21 1410 2548"
        openGraph={{
          url: "https://eshop.all4skin.gr/contact-us",
          title: "Επικοινωνία - All4Skin",
          description:
            "info@all4skin.gr. Ιστοσελίδα. https://eshop.all4skin.gr/.  Leof. Alexandras 192Α, Athina 115 21. 21 1410 2548",
          site_name: "All4Skin",
          images: [
            {
              url: "https://all4skin.gr/wp-content/uploads/2015/11/Screenshot_2.png",
              width: 800,
              height: 600,
              alt: "Όροι χρήσης",
              type: "image/jpeg",
            },
          ],
        }}
      />
      <Modal>
        <Box py={{ base: "20", md: "15vh" }} px={{ base: "3", md: "10" }}>
          <Container
            maxW={{ base: "container.lg", md: "container.xl" }}
            centerContent
            py={{ base: "5", md: "10" }}
          >
            <Heading fontWeight="semibold">Επικοινωνία</Heading>

            <Box w="full" my="10">
              <SimpleGrid justifyContent="center" columns={{ base: 1, md: 2 }}>
                {/* Business Data */}
                <Box
                  borderRight={{ base: "0", md: "1px" }}
                  py="5"
                  px={{ base: "0", md: "5" }}
                >
                  <Stack spacing="6">
                    <Heading as="h1" fontSize="2xl" fontWeight="semibold">
                      Στοιχεία Επικοινωνίας
                    </Heading>

                    <Stack spacing="0">
                      <Text>
                        <b>{"Address"}:</b>
                      </Text>
                      <Text>Ιπποκράτους 113, Αθήνα 114 72</Text>
                      <Text>Email: soulparfumerie@yahoo.com</Text>
                    </Stack>
                    <Stack spacing="0">
                      <Text>
                        <b>Ωράριο Λειτουργίας:</b>
                      </Text>
                      <Text>Δευτέρα – Τετάρτη – Παρασκευή: 16:00 – 22:00</Text>
                      <Text>Τρίτη – Πέμπτη: 09:00 – 15:00</Text>
                    </Stack>
                    <Stack spacing="0">
                      <Text>
                        <b>Τηλέφωνο:</b>
                      </Text>
                      <Text>211 7154516</Text>
                    </Stack>
                  </Stack>
                </Box>

                {/* Form section */}
                <Box
                  px={{ base: "0", md: "5" }}
                  py="5"
                  mt={{ base: "12", md: "0" }}
                >
                  <Stack>
                    <Heading as="h1" fontSize="2xl" fontWeight="semibold">
                      Φόρμα Επικοινωνίας
                    </Heading>
                    <Stack spacing="5">
                      <FormControl isRequired my="3">
                        <FormLabel>{"checkout:firstName"}</FormLabel>
                        <Input
                          _focus={{ outline: "none", borderColor: "black" }}
                          borderColor="gray.400"
                          rounded="md"
                          size="md"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                          _focus={{ outline: "none", borderColor: "black" }}
                          borderColor="gray.400"
                          rounded="md"
                          size="md"
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Μήνυμα</FormLabel>
                        <Textarea
                          _focus={{ outline: "none", borderColor: "black" }}
                          borderColor="gray.400"
                          rounded="md"
                          size="md"
                        />
                      </FormControl>
                      <Button colorScheme="blackAlpha">Αποστολή</Button>
                    </Stack>
                  </Stack>
                </Box>
              </SimpleGrid>
            </Box>
          </Container>
        </Box>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
};

export default ContactUs;
