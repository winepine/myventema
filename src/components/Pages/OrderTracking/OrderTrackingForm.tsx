import React, { FC, FormEvent, useEffect, useState } from 'react'
import { 
  Box, 
  Container, 
  Heading, 
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { chakra } from '@chakra-ui/system';
import { useRouter } from 'next/router';

interface Props {
  onSubmit: ({orderId, email}: {orderId: string, email: string}) => void
  loading: boolean
  error: string
}
const OrderTrackingForm:FC<Props> = ({ onSubmit, loading, error }) => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const { orderId, email }: any = router.query;
    setOrderId(orderId || "");
    setEmail(email || "");
  }, [router.query])

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({ orderId, email });
  }

  return (
    <Stack spacing="6" maxW="30rem" textAlign="center">
      <Stack spacing="6">
        <Heading fontSize="26">Παρακολούθηση Παραγγελιών</Heading>
        <Text textAlign="justify">Για να εντοπίσεις την παραγγελία σου, πληκτρολόγησε τον αριθμό της παραγγελίας σου στο παρακάτω πλαίσιο και πάτα το κουμπί “Εντοπισμός“. Αυτό θα το βρεις στο email επιβεβαίωσης και SMS που θα πρέπει να έχεις λάβει.</Text>
      </Stack>
      
      <Stack spacing="3">
        {error && <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>}

        <chakra.form
          onSubmit={handleFormSubmit}
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <FormControl isRequired>
                <FormLabel fontSize="14" fontWeight="semibold">
                 Αριθμός Παραγγελίας
                </FormLabel>
                <Input 
                  type="number"
                  size="lg"
                  placeholder="Βρίσκεται στο email επιβεβαίωσης της παραγγελίας." 
                  value={orderId}
                  onChange={(e) => setOrderId(e.currentTarget.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="16" fontWeight="semibold">
                Διεύθυνση Email
                </FormLabel>
                <Input
                  type="email" 
                  size="lg" 
                  placeholder="Το email που χρησιμοποίησες κατά την ολοκλήρωση της παραγγελίας σου"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
              </FormControl>
            </Stack>

            <Button isLoading={loading} type="submit" colorScheme="primary" size="lg">Εντοπισμός</Button>
          </Stack>
        </chakra.form>
      </Stack>
    </Stack>
  )
}

export default OrderTrackingForm
