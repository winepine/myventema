import ImageNext from 'next/image';
import { Box, Container, Heading, SimpleGrid, Text, Wrap, Stack, OrderedList, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import { NextSeo } from 'next-seo'

export default function ShippingMethods({ deviceType }) {
   return (
      <>
        <NextSeo title="Επιστροφές - All4Skin" />
        <Modal>
        <Box py="28" b="white">
        <Container minH="60vh" my="8" maxW={{ base: "container.md", md: "container.xl"}} width="97%" fontWeight="400" fontSize="16">
          
          <Box px="3">
              <Heading as="h1" fontSize={29}>Επιστροφές</Heading>
              <Text as="h2" my={4}>Μπορείτε να επιστρέψετε οποιοδήποτε</Text> 
              <Text my={4}>προϊόν εφόσον είναι ελαττωματικό, εντός 7 ημερών, απαραίτητη προϋπόθεση για να γίνει δεκτή η επιστροφή είναι να μας ειδοποιήσετε μέσω της φόρμας επικοινωνίας στο e-shop μας ή μέσω e-mail ή τηλεφωνικά στο 21 1410 2548.</Text>
              <Text my={4}>H εταιρεία δεν μπορεί να επιστρέψει τα χρήματα που δαπανήθηκαν για την εν λόγο αγορά και για τον λόγο αυτό είναι απαραίτητη η επικοινωνία με το κατάστημά μας ώστε να καλυφθεί η οικονομική διαφορά με κάποιο άλλο προϊόν ίσης ή μεγαλύτερης αξίας .</Text> 
              <Text my={4}>Οι επιστροφές γίνονται δεκτές μόνο σε περίπτωση ελαττωματικού προϊόντος και ύστερα από έλεγχο που πραγματοποιείται στο προϊόν.</Text>

              </Box>
        </Container>
        </Box>

          <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
          </CloseModalOutsideClick>
        </Modal>
      </>
   )
}