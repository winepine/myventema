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
      <NextSeo title="Τρόποι Αποστολής - All4Skin" />
      <Modal>
      <Box py="28" b="white">
      <Container my="8" maxW={{ base: "container.md", md: "container.xl"}} width="97%" fontWeight="400" fontSize="16">
         
        <Box px="3">
            <Heading as="h1" fontSize={29}>Τρόποι Αποστολής</Heading>
            <Text as="h2" my={4}>Δείτε τους τρόπους αποστολής μας</Text> 
            <Text my={4}><b>Παραλαβή από το Ιατρείο:</b> Οι χρήστες μπορούν να επιλέξουν το All4Skin που βρίσκεται στο κέντρο της Αθήνας κοντά στο μετρό Αμπελοκήπων για να παραλάβουν την παραγγελία τους χωρίς καμία επιβάρυνση εξόδων αποστολής. Η παραλαβή θα πρέπει να γίνει εντός 72 ωρών από την ημέρα της παραγγελίας. Ωράριο Λειτουργίας: Δευτέρα - Τετάρτη - Πέμπτη: 13:00-21:00 | Τρίτη - Παρασκευή: 10:00-18:00. Διεύθυνση: Λεωφόρος Αλεξάνδρας 192Α, Τ. 21 1410 2548 </Text>
            <Text my={4}><b>2. ACS Courier:</b> Το All4Skin συνεργάζεται με την ACS Courier για να αποστέλλει τα προϊόντα. Αν η παραγγελία πραγματοποιηθεί πριν τις 15:00 σε εργάσιμη μέρα, τότε το προϊόν θα αποσταλεί αυθημερόν και θα το παραλάβετε την επόμενη εργάσιμη με τη συνεργαζόμενη εταιρία courier. Το κόστος αποστολής με courier επιβαρύνει τον παραλήπτη. Χρόνος Παράδοσης: Παράδοση 1-3 εργάσιμες (Οι χρόνοι παράδοσης είναι ενδεικτικοί) <b>Κόστος: 3€</b></Text> 
            <Text my={4}><b>Κόστος Αντικαταβολής: 2€</b> </Text>

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