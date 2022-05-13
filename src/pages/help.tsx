import { Box, Container, Heading, SimpleGrid, Square, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Image from 'next/image'
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import Link from 'next/link';
import { NextSeo } from 'next-seo'
import { frontEndDomain } from 'site-settings/site-credentials';

const HelpPage = ({ deviceType }) => {
  return (
    <>
    <NextSeo 
      title="Βοήθεια Αγορών - All4Skin" 
      description="Βοήθεια αγορών. Πως μπορώ να περιηγηθώ στο ηλεκτρονικό σας κατάστημα; Στο ηλεκτρονικό κατάστημα του “All4Skin” διατίθονται περίπου 150 προϊόντα ..."
      openGraph={{
        url: `${frontEndDomain}/help`,
        title: "Βοήθεια Αγορών - All4Skin",
        description: "Βοήθεια αγορών. Πως μπορώ να περιηγηθώ στο ηλεκτρονικό σας κατάστημα; Στο ηλεκτρονικό κατάστημα του “All4Skin” διατίθονται περίπου 150 προϊόντα ...",
        site_name: "All4Skin",
        images: [
            {
              url: `${frontEndDomain}/wp-content/uploads/2015/11/Screenshot_2.png`,
              width: 800,
              height: 600,
              alt: 'Όροι χρήσης',
              type: 'image/jpeg',
            }
        ]
      }}
    />
    <Modal>
    <Box py="28" minH="80vh">
      <Container mb="5" px={{ base: "2", md: "6"}} maxW={{ base: "container.md", lg: "container.xl"}}  centerContent>
        <Stack pt="6">
          <Heading>Βοήθεια Αγορών</Heading>
        </Stack>

        <SimpleGrid my="10" columns={{ base: 1, sm: 2 }} spacing="10" w="full" justify="center">
          <Box bg="white" border="1px" borderColor="gray.300" px="4" py="10">
            <Stack spacing="4" align="center">
              <Square size="6rem" position="relative">
                <Image
                  src="https://sfkshop.gr/wp-content/uploads//2020/04/support.svg"
                  layout="fill"
                />
              </Square>
              <Heading fontSize="20" pt="3">Αγορά & Εργαλεία</Heading>
              <Stack spacing="0" align="center">
                <Text fontSize="14">
                  <Link href="/tropoi-apostolis">
                    <a>Τρόποι Πληρωμής</a>
                  </Link>
                </Text>
                <Text fontSize="14">
                  <Link href="/tropoi-apostolis">
                    <a>Τρόποι Αποστολής</a>
                  </Link> 
                </Text>
                <Text fontSize="14">
                  <Link href="/contact-us">
                    <a>Επιστροφές Προϊόντων</a>
                  </Link>
                </Text>
                <Text fontSize="14">
                  <Link href="/order">
                    <a>Παρακολούθηση Παραγγελίας</a>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>

          <Box bg="white" border="1px" borderColor="gray.300" px="4" py="10">
            <Stack spacing="4" align="center">
              <Square size="6rem" position="relative">
                <Image
                  src="https://sfkshop.gr/wp-content/uploads//2020/04/like-1.svg"
                  layout="fill"
                />
              </Square>
              <Heading fontSize="20" pt="3">Όροι Χρήσης & Ασφάλεια</Heading>
              <Stack spacing="0" align="center">
                <Text fontSize="14">
                  <Link href="/oroi-xrisis">
                    <a>Όροι Χρήσης</a>
                  </Link>
                </Text>
                <Text fontSize="14">
                  <Link href="/prostasia-prosopikon-dedomenon-gdpr">
                    <a>Προστασία Προσωπικών Δεδομένων (GDPR)</a>
                  </Link>
                </Text>
                <Text fontSize="14">
                  <Link href="/sixnes-erwtiseis">
                    <a>Συχνές Ερωτήσεις</a>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>

    <CloseModalOutsideClick>
        <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
    </Modal>
    </>
  )
}

export default HelpPage
