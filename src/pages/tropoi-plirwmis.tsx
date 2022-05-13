import { Box, Center, Container, Heading, Stack, Text } from '@chakra-ui/layout'
import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '@redq/reuse-modal';
import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
import CartPopUp from 'features/carts/cart-popup';
import { NextSeo } from 'next-seo'
import { frontEndDomain, siteURL } from 'site-settings/site-credentials';

export default function PaymentMethods({ deviceType }) {
   return (
      <>
      <NextSeo 
         title="Τρόποι Πληρωμής - All4Skin"
         description="Τρόποι πληρωμής, eshop.all4skin.gr - Προϊόντα περιποίησης προσώπου και σώματος Online. Άμεση παράδοση. Οικονομικά."
         openGraph={{
            url: `${frontEndDomain}/tropoi-plirwmis`,
            title: "Τρόποι Πληρωμής - All4Skin",
            description: "Τρόποι πληρωμής, eshop.all4skin.gr - Προϊόντα περιποίησης προσώπου και σώματος Online. Άμεση παράδοση. Οικονομικά.",
            site_name: "All4Skin",
            images: [
               {
                  url: `${siteURL}/wp-content/uploads/2015/11/Screenshot_2.png`,
                  width: 800,
                  height: 600,
                  alt: 'Όροι χρήσης',
                  type: 'image/jpeg',
               }
            ]
         }} 
      />
      <Modal>
      <Box py="20" b="white">
      <Container my="8" maxW={{ base: "container.md", md: "container.xl"}} width="97%" fontWeight="400" fontSize="16">
         
        <Box px="3">
            <Heading fontSize={29} as="h1">Τρόποι Πληρωμής</Heading>
            <Text as="h2" my={4}>Δείτε τους τρόπους πληρωμής μας</Text> 
            <Text my={4}>Όταν ο επιλεγόμενος τρόπος πληρωμής είναι με αντικαταβολή, η αξία αυτής δεν μπορεί να ξεπερνά το ύψος των πεντακοσίων ευρώ (500€).</Text> 
            <Text my={4}><b>Αντικαταβολή:</b> Η υπηρεσία της αντικαταβολής χρεώνεται από τη Courier και αφορά το τρόπο πληρωμής με μετρητά όταν έρθει η παραγγελία σας. <b>Κόστος: 2€</b></Text> 
            <Text my={4}><b>Τραπεζική Κατάθεση:</b> Χρησιμοποιήστε ως αιτιολογία οπωσδήποτε τον αριθμό της παραγγελίας σας και το ονοματεπώνυμο που καταχωρήσατε στην παραγγελία Παρακαλούμε να μας στείλετε το αποδεικτικό στο Παρακαλούμε να μας στείλετε το αποδεικτικό στο</Text>
            <Text my={4}>
               email:
               <Text color="blue.600" ml="2" as="span">
                  <a href="mailto:info@all4skin.gr">
                     info@all4skin.gr
                  </a>
               </Text> 
            </Text> 
            <Text my={4}>Όνομα Τράπεζας: Πειραιώς</Text> 
            <Text my={4}>Αριθμός Λογαριασμού:</Text> 
            <Text my={4}>ΙΒΑΝ: </Text> 
            <Text my={4}>Όνομα Δικαιούχου: </Text> 
            <Text my={4}><b>Χρεωστική ή Πιστωτική Κάρτα:</b> Στο All4Skin δεκτές γίνονται οι Visa, Mastercard, Diners, AMEX πιστωτικές κάρτες, οι Visa, Mastercard χρεωστικές κάρτες και οι Visa, Mastercard προπληρωμένες κάρτες. Η πληρωμή ολοκληρώνεται σε ασφαλές περιβάλλον του Stripe. Η παράδοση των παραγγελιών όπου η πληρωμή έχει πραγματοποιηθεί με πιστωτική κάρτα, γίνονται μόνο στον κάτοχο της πιστωτικής κάρτας, με την επίδειξη της κάρτας και της αστυνομικής ταυτότητας. Παραγγελίες με πληρωμή με πιστωτική κάρτα δεν παραδίδονται σε τρίτο πρόσωπο. Στις αναγραφόμενες τιμές συμπεριλαμβάνονται οι νόμιμοι Φόροι μέχρι την πλήρη εξόφληση του τιμήματος τα εμπορεύματα παραμένουν στην κυριότητα της πωλήτριας εταιρείας. Εφόσον επιλέξετε πληρωμή με την Πιστωτική / Χρεωστική σου κάρτα, πραγματοποιείται αρχικά δέσμευση του ποσού και η τελική χρέωση πραγματοποιείται κατά την έκδοση του παραστατικού πώλησης. Σε περίπτωση ακύρωσης της παραγγελία σας πριν την τιμολόγηση της, η ΕΤΑΙΡΕΙΑ μας υποχρεούται να ενημερώσει την Τράπεζα για την ακύρωση της εν λόγω δέσμευσης και η Τράπεζα θα προχωρήσει σύμφωνα με τους όρους που προβλέπονται από τη σύμβαση που έχει υπογραφεί μεταξύ του πελάτη (εσείς) και της Τράπεζας του (σας). Η Εταιρεία μετά από την ενημέρωση αυτή δεν φέρει καμία ευθύνη για την υλοποίηση των όρων της προαναφερθείσας σύμβασης μεταξύ του πελάτη και της Τράπεζας καθώς και για τον χρόνο και τρόπο εκτέλεσης του αντιλογισμού της εν’ λόγω συναλλαγής. </Text> 

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