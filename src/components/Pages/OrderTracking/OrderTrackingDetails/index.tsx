import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Heading, 
  Wrap, 
  Text, 
  Stack, 
  Image, 
  WrapItem, 
  SimpleGrid,
  HStack,
  Icon,
  Alert, 
  AlertIcon,
  Container,
  Progress,
} from '@chakra-ui/react'
import AppDivider from 'components/common/AppDivider';
import { FiPackage } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import dateFormat from 'dateformat';
import { ProgressWrapper as MobileProgressWrapper } from 'features/user-profile/order/order-card/order-card.style';
import RenderProgressStatus from 'features/user-profile/order/RenderProgressStatus';
import Geocode from 'react-geocode';
import { googleMapKey } from 'site-settings/site-credentials';
import Map from 'components/common/Map';
import axios from 'axios';
import useFetchProductsByIds from 'hooks/useFetchProductsByIds';
import Loader from 'components/loader/loader';
import Link from 'next/link';
import getProductURI from 'utils/getProductURI';
import { getShippingMethodCustom, getTranslatedPaymentMethod, getVoucherNumberFromMetaData } from 'utils/orders_utils';
import { ProgressWrapper } from 'features/user-profile/order/order-details/order-details.style';


const OrderTrackingDetails = ({ order }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  
  // const progressData = ['processing', 'apodoxi', 'to-ship', 'completed', 'deliverycompleted']
  const progressData = ['processing', 'completed', 'deliverycompleted']
  const { id, date_created, date_completed, payment_method_title, status, billing, shipping, line_items } = order;
  

  useEffect(() => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey(googleMapKey);
    
    // Get latitude & longitude from address.
    Geocode.fromAddress(shipping.address_1).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
      },
      (error) => {
        console.error(error);
      }
      );
  }, []);

  return (
    <Box w="full">
      <Stack spacing="8">
        {/* Header */}
        <Stack spacing="8">
          {/* Top 1 */}
          <Wrap justify="space-between">
            {/* <Heading>Details of your order.</Heading> */}
            <Heading>Λεπτομέρειες της παραγγελίας σου</Heading>
            
            <Stack spacing="0" align="flex-end" justify="flex-end" w={{ base: 'full', md: 'max' }}>
              {/* <Text>Order Number: #{id}</Text> */}
              <Text>Αριθμός Παραγγελίας #{id}</Text>
              <Text>Ημερομηνία Δημιουργίας Παραγγελίας: {dateFormat(date_created, "ddd, mmmm dS, yyyy")}</Text>
            </Stack>
          </Wrap>

          {/* Top 2 */}
          <Wrap spacing="8">
            <WrapItem h="20rem" w={{ base: "full", md: "30rem"}} bg="pink">
              <Map 
                lat={lat}
                lng={lng}
              />
            </WrapItem>
            <WrapItem minW="20rem" flex="1" justifyContent="center" px="5">
              <Stack w="full" spacing="6">
                <Stack>
                  <Text fontSize="16" fontWeight="semibold">Εκτιμώμενη παράδοση</Text>
                  {/* <Heading fontSize={{ base: "24", md: "28"}}>{date_completed ? `Arrived:  ${dateFormat(date_completed, 'mmmm dS, yyyy')}` : 'Arrives 1-3 εργάσιμες'}</Heading> */}
                  <Heading fontSize={{ base: "24", md: "28"}}>{date_completed ? `Έφτασε:  ${dateFormat(date_completed, 'mmmm dS, yyyy')}` : 'Παράδοση σε 1-3 εργάσιμες'}</Heading>
                </Stack>
                <Stack>
                  {order?.shipping_lines?.[0]?.method_title && <Wrap>
                    {/* <Text fontWeight="bold">Deliver by: </Text> */}
                    <Text fontWeight="bold">Αποστολή με: </Text>
                    <Text>{getShippingMethodCustom(order?.shipping_lines?.[0]?.method_title)}</Text>
                  </Wrap>}
                  {getVoucherNumberFromMetaData(order.meta_data) && <Wrap>
                    {/* <Text fontWeight="bold">Voucher Number: </Text> */}
                    <Text fontWeight="bold">Αριθμός Φορτωτικής: </Text>
                    <Text>{getVoucherNumberFromMetaData(order.meta_data)}</Text>
                  </Wrap>}
                </Stack>
                <MobileProgressWrapper>
                  <RenderProgressStatus progressData={progressData} progressStatus={progressData.findIndex(step => step === status) + 1} orderStatus={status} />
                </MobileProgressWrapper> 
              </Stack>
            </WrapItem>
          </Wrap>
        </Stack>

        <AppDivider />
      
        {/* Main */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="8">
          <Box>
            <LineItems order={order} />
          </Box>
          <Box>
            <HStack align="flex-start" justify={{ base: "left", md: "center"}}>
              <Icon fontSize="22" as={FiPackage} />
              <Stack spacing="2">
                <Stack spacing="-1">
                  {/* <Text>Delivers: </Text> */}
                  <Text>Πληρωμή με: </Text>
                  <Text fontSize="18">{getTranslatedPaymentMethod(payment_method_title)}</Text>
                </Stack>

                <Stack spacing="0">
                  <Text>Address: {shipping.address_1}</Text>
                  {/* <Text>Διεύθυνση: {billing.address_1}</Text> */}
                  <Text>State: {shipping.state}</Text>
                  {/* <Text>Περιοχή: {billing.state}</Text> */}
                  <Text>Postal Code: {shipping.postcode}</Text>
                  {/* <Text>Τ.Κ: {billing.postcode}</Text> */}
                </Stack>
              </Stack>
            </HStack>
          </Box>
          <Box>
            <HStack align="flex-start" justify={{ base: "left", md: "center" }}>
              <Icon fontSize="22" as={HiOutlineMail} />
              <Stack spacing="2">
                <Stack spacing="2">
                  {/* <Text>Shared email and phone: </Text> */}
                  <Text>Στοιχεία Επικοινωνίας: </Text>
                  <Text fontSize="18">{billing.email}</Text>
                  <Text fontSize="18">{billing.phone}</Text>
                </Stack>
              </Stack>
            </HStack>
          </Box>
        </SimpleGrid>

      </Stack>
    </Box>
  )
}

function LineItems({ order }) {
  const { products, loading } = useFetchProductsByIds(order.line_items);

  if (loading) return <Container centerContent>
    <Loader />
  </Container>

  return (
    <Stack spacing="4">
      {products.map(item => {
        return (
          <HStack key={item.id} justify="space-between" align="flex-start">
            <Stack>
              <Link href={getProductURI(item.permalink)} passHref>
                <Text as="a" fontSize="16">{item.title}</Text>
              </Link>
              <Text color="GrayText" fontSize="16">{item.quantity} &times; {item.subtotal}</Text>
            </Stack>
            <Text w="8rem" align="right" pl="1" pt="0.5" fontWeight="semibold">€ {item.total}</Text>
          </HStack>
        )
      })}
    </Stack>
  )
}

export default OrderTrackingDetails
