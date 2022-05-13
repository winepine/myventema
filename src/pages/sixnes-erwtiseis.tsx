import { Box, Heading, Text, Link, Spacer } from '@chakra-ui/layout'
import React, { useContext, useEffect } from 'react';
import { Container } from "@chakra-ui/react"
import {
   Accordion,
   AccordionItem,
   AccordionButton,
   AccordionPanel,
   AccordionIcon,
 } from "@chakra-ui/react"
 import { Modal } from '@redq/reuse-modal';
 import CloseModalOutsideClick from 'utils/closeModalOutsideClick';
 import CartPopUp from 'features/carts/cart-popup';
import { NextSeo } from 'next-seo'
import { siteURL } from 'site-settings/site-credentials';

export default function FrequentQuestions({ deviceType }) {
   return (
      <>
      <NextSeo 
         title="Συχνές Ερωτήσεις - All4Skin" 
         description="Δείτε εδώ απαντήσεις στις πιο συχνές σας ερωτήσεις. Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες!"
         openGraph={{
            url: "https://eshop.all4skin.gr/sixnes-erwtiseis",
            title: "Συχνές Ερωτήσεις - All4Skin",
            description: "Δείτε εδώ απαντήσεις στις πιο συχνές σας ερωτήσεις. Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες!",
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
      <Box py="24">
      <Container mb="5" px={{ base: "2", md: "10"}} maxW={{ base: "container.md", lg: "container.xl"}}  centerContent>
         <Heading my="8">Συχνές Ερωτήσεις</Heading>

         <Box w="full">

      {/*//////////////////// card 1 //////////////////////*/}
         <Text  fontSize="xl" my="3" color="primary.100">
         Γενικές Πληροφορίες
         </Text>

         <Accordion allowToggle >
            <AccordionItem >
               <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" textColor="inherit">
                  ΠΩΣ ΜΠΟΡΩ ΝΑ ΕΠΙΚΟΙΝΩΝΗΣΩ ΜΑΖΙ ΣΑΣ;
                  </Heading>
               </AccordionButton>
               <AccordionPanel pb={5} fontSize="md">
               Η ομάδα του SFKshop.gr είναι δίπλα σου για ό,τι χρειαστείς.

Επικοινώνησε μαζί μας καθημερινά με 3 διαφορετικούς τρόπους:

Συμπληρώνοντας τα στοιχεία και το αίτημά σου στη φόρμα επικοινωνίας που βρίσκεις εδώ.
Καλώντας μας στα τηλέφωνα 21064 21065 (από κινητό και σταθερό) με αστική χρέωση, από Δευτέρα έως Παρασκευή 10πμ – 5μμ.
Συνομιλώντας μαζί μας ζωντανά μέσω της υπηρεσίας live chat από Δευτέρα – Παρασκευή 10:00-17:00.
               </AccordionPanel>
            </AccordionItem>

            <AccordionItem >
               <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" textColor="inherit">
                  ΠΩΣ ΠΑΡΑΚΟΛΟΥΘΩ ΤΗΝ ΕΞΕΛΙΞΗ ΤΗΣ ΠΑΡΑΓΓΕΛΙΑΣ ΜΟΥ;
                  </Heading>
               </AccordionButton>
               <AccordionPanel pb={4} fontSize="md" >
               Οποιαδήποτε στιγμή θελήσεις μπορείς να δεις το στάδιο που βρίσκεται η παραγγελία σου εδώ πραγματοποιώντας είσοδο στον λογαριασμό σου και επιλέγοντας “παρακολούθηση παραγγελίας” στο αριστερό μέρος της σελίδας!

Εναλλακτικά, μπορείς να δείς το στάδιο της παραγγελίας σου μέσω του website της ACS Courier εδώ, το website της Elta Courier εδώ ή ρώτησέ μας για την εξέλιξη της παραγγελίας σου στο Live chat, τηλεφωνικά, στο facebook ή στείλε μας email εδω
               </AccordionPanel>
            </AccordionItem>
         </Accordion>

{/*//////////////////// card 2 //////////////////////*/}
         <Text fontSize="xl" my="3" color="primary.100">
         Πληροφορίες για παραγγελίες
         </Text>

            <Accordion allowToggle >
         <AccordionItem>
            <h2>
               <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                  ΤΙ ΣΗΜΑΙΝΟΥΝ ΟΙ ΔΙΑΘΕΣΙΜΟΤΗΤΕΣ ΠΡΟΪΟΝΤΩΝ;
                  </Heading>
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md">
            H διαθεσιμότητα των προϊόντων εμφανίζεται στην σελίδα του προϊόντος.
Το προϊόν μπορεί να είναι:

Άμεσα διαθέσιμο:  Διαθέσιμο για ηλεκτρονική αγορά.
Παράδοση 1-3 εργάσιμες: Το προϊόν είναι διαθέσιμο στις κεντρικές αποθήκες μας και θα είναι διαθέσιμο για αποστολή εντός 3 εργάσιμων.
Παράδοση 4-10 εργάσιμες: Το προϊόν θα είναι διαθέσιμο για αποστολή σε 4-10 εργάσιμες.
Κατόπιν Παραγγελίας: Είναι διαθέσιμο για προ-παραγγελία και η ημερομηνία παράδοσης εξαρτάται από την επίσημη ημέρα παράδοσης από την επίσημη αντιπροσωπεία. Τηρείται σειρά προτεραιότητας.
Εξαντλημένο: Δεν είναι διαθέσιμο για παραγγελία αυτή τη στιγμή. 
            </AccordionPanel>
         </AccordionItem>

         <AccordionItem>
            <h2>
               <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                  ΠΩΣ ΜΠΟΡΩ ΝΑ ΚΑΤΑΧΩΡΗΣΩ ΤΗΝ ΠΑΡΑΓΓΕΛΙΑ ΜΟΥ;
                  </Heading>

             
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md">
            Μπορείς να παραγγείλεις τα προϊόντα που θέλεις με 3 απλούς τρόπους!

1. Καταχωρώντας ηλεκτρονική παραγγελία όλο το 24ωρο στο SFKshop.gr

2. Μέσω του live chat που εμφανίζεται στο πάνω μέρος οποιασδήποτε σελίδας!
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00

3. Με τηλεφωνική παραγγελία στο 21064 21065 (από κινητό* και σταθερό ) 
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00* (αστική χρέωση)
            </AccordionPanel>
         </AccordionItem>

         <AccordionItem>
            <h2>
               <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                  <AccordionIcon />   
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                  ΠΩΣ ΘΑ ΞΕΡΩ ΑΝ ΕΧΕΙ ΚΑΤΑΧΩΡΗΘΕΙ Η ΠΑΡΑΓΓΕΛΙΑ ΜΟΥ;
                  </Heading>

              
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md">
            Κατά την επιτυχή ολοκλήρωση της παραγγελίας σου θα λάβεις επιβεβαιωτικό email με την σύνοψη της αγοράς σου καθώς και τον κωδικό της παραγγελίας.
Σε περίπτωση που δεν λάβεις το επιβεβαιωτικό email, πιθανότατα:

• να μην έχεις ολοκληρώσει την παραγγελία σου
• να έχεις καταχωρήσει λανθασμένο το email
• να έχει μεταφερθεί στην ανεπιθύμητη αλληλογραφία
             
            </AccordionPanel>
         </AccordionItem>

         <AccordionItem>
            <h2>
               <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                  ΣΤΑΔΙΑ ΠΑΡΑΓΓΕΛΙΑΣ
                  </Heading>

              
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md">
            Η παραγγελία σου έχει καταχωρηθεί! Έχεις λάβει email με την επιβεβαίωση

Η παραγγελία σου βρίσκεται σε διεκπεραίωση και σύντομα θα ενημερωθείς με email / sms για την εξέλιξή της!

Η παραγγελία σου έχει αποσταλεί. Η παραγγελία σου έχει αποσταλεί μέσω ACS Courier ή Elta Courier για να δρομολογηθεί η αποστολή της στο χώρο σου εντός 3 εργάσιμων ημερών! Η παραγγελία σου έχει τιμολογηθεί και έχει παραδοθεί στην εταιρεία ACS Courier ή Elta Courier η οποία θα δρομολογήσει την αποστολή της στο χώρο σου!

Η παραγγελία σου έφτασε.  Η παραγγελία σου παραδόθηκε στο χώρο σου.

Η παραγγελία σου έχει ακυρωθεί. Η παραγγελία ακυρώθηκε
                     
            </AccordionPanel>
         </AccordionItem>

         <AccordionItem>
            <h2>
               <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                  <AccordionIcon />
                  <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                  ΜΠΟΡΩ ΝΑ ΑΛΛΑΞΩ/ΤΡΟΠΟΠΟΙΗΣΩ/ΑΚΥΡΩΣΩ ΤΗΝ ΠΑΡΑΓΓΕΛΙΑ ΜΟΥ;
                  </Heading>
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontSize="md">
            Ναι, επικοινωνώντας μαζί μας με έναν από τους παρακάτω τρόπους

1. Μέσω του live chat που εμφανίζεται στο κάτω μέρος του SFKshop.gr!
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00

2. Τηλεφωνικά στο 21064 21065 (από κινητό* και σταθερό ) 
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00 * (αστική χρέωση)
3. Μέσω email συμπληρώνοντας την φόρμα επικοινωνίας εδώ 
            </AccordionPanel>
         </AccordionItem>
</Accordion>


{/*//////////////////// card 3 //////////////////////*/}
      <Text fontSize="xl" my="3" color="primary.100">
      Πληροφορίες σχετικά με την αποστολή
               </Text>

                  <Accordion allowToggle >
               <AccordionItem>
                  <h2>
                     <AccordionButton _expanded={{ color: "primary.100" }} my="1">
                        <AccordionIcon />
                        <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                        ΠΟΙΟ ΕΙΝΑΙ ΤΟ ΚΟΣΤΟΣ ΤΩΝ ΜΕΤΑΦΟΡΙΚΩΝ;
                        </Heading>
                  
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                  Παραδόσεις κατ’ οίκον πραγματοποιούνται από την εταιρία Courier στις περιοχές που διαθέτει γραφείο/α στον τόπο αποστολής.
Κόστος Αποστολής με Courier είναι:

Για όλες τις αποστολές σας προσφέρουμε την ειδική τιμή των 3.5 € για βάρος έως 3 κιλά. Για κάθε επόμενο κιλό η χρέωση ανέρχεται  στα 1 €.
Σε περιπτώσεις αποστολών με αντικαταβολή η επιβάρυνση στη βασική τιμή ανέρχεται στο 2,90 €.
 
Με μεταφορική

Τα ογκώδη δέματα αποστέλλονται με μεταφορική εταιρεία κατόπιν συννενόησης. Με αυτό τον τρόπο αποστολής δεν ισχύει η πληρωμή με αντικαταβολή. Πριν την αποστολή θα υπάρχει τηλεφωνική επικοινωνία μαζί σας.
                  </AccordionPanel>
               </AccordionItem>

               <AccordionItem>
                  <h2>
                     <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                        <AccordionIcon />
                        <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                        ΧΡΟΝΟΣ ΑΠΟΣΤΟΛΗΣ;
                        </Heading>
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                  Οι παραγγελίες που καταχωρούνται μέχρι τις 14:00 (σε εργάσιμες μέρες) αποστέλλονται την ίδια μέρα και παραδίδονται σε μια έως  τρεις εργάσιμες (συνήθως από 1 έως 3 εργάσιμες ημέρες Δευτέρα – Παρασκευή).
                  </AccordionPanel>
               </AccordionItem>

               <AccordionItem>
                  <h2>
                     <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                        <AccordionIcon />
                        <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                        ΠΩΣ ΝΑ ΑΛΛΑΞΩ ΤΑ ΣΤΟΙΧΕΙΑ ΑΠΟΣΤΟΛΗΣ;
                        </Heading>
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                  Μπορείς να παραγγείλεις τα προϊόντα που θέλεις με 3 απλούς τρόπους!

1. Καταχωρώντας ηλεκτρονική παραγγελία όλο το 24ωρο στο SFKshop.gr

2. Μέσω του live chat που εμφανίζεται στο πάνω μέρος οποιασδήποτε σελίδας!
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00

3. Με τηλεφωνική παραγγελία στο 21064 21065 (από κινητό* και σταθερό ) 
Δευτέρα έως Παρασκευή από τις 10:00 έως τις 17:00* (αστική χρέωση)
                  </AccordionPanel>
               </AccordionItem>

               <AccordionItem>
                  <h2>
                     <AccordionButton my="1" _expanded={{ color: "primary.100" }}>
                        <AccordionIcon />
                        <Heading ml="3" flex="1" textAlign="left" as="h5" size="sm" color="inherit">
                        ΠΩΣ ΕΠΙΣΤΡΕΦΩ ΠΡΟΪΟΝΤΑ;
                        </Heading>
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md">
                  Σε περίπτωση που επιθυμείς να επιστρέψεις το προϊόν που έχεις αγοράσει, έχεις τη δυνατότητα να το κάνεις με 2 τρόπους εντός 7 ημερολογιακών ημερών από την ημέρα που το παρέλαβες! (Απαραίτητη προϋπόθεση το προϊόν να βρίσκεται στην κλειστή εμπορική του συσκευασία και να συνοδεύεται από την απόδειξη αγοράς).
Αποστέλλοντας το/τα με δικά σου έξοδα, στην αρχική του κατάσταση και συσκευασία, στο SFKshop.gr εσωκλείνοντας την απόδειξη αγοράς.
                  </AccordionPanel>
               </AccordionItem>
         </Accordion>
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