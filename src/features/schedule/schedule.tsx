import React, { useContext } from 'react';

import { CardHeader } from 'components/card-header/card-header';

import { Box as ChakraBox, Checkbox, Textarea, Stack, FormControl, FormLabel, Divider, Wrap, Heading, Text, SimpleGrid, ScaleFade, RadioGroup, Radio, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { FC } from 'react';
import CustomSelectField from 'components/common/CustomSelectField';
import FormikInputField from 'components/common/FormikInputField';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useRef } from 'react';

interface Props {
  increment?: boolean
  formik?: FormikProps<any>
  submitTriggered?: boolean
  selectedShippingLine: string
  setIsSubmitTriggered?: (e) => void
  onShowAddressSection?: (e) => void
  onSelectedShippingLine?: (value: string) => void
}

const Schedules = ({ selectedShippingLine, onSelectedShippingLine, submitTriggered, setIsSubmitTriggered, increment = false, formik, onShowAddressSection }: Props) => {
  const [showAddressSection, setShowAddressSection] = useState(false);
  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!submitTriggered) return;

    if (formik.errors.name_2 && formik.touched.name_2) {
      nameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.surname_2 && formik.touched.surname_2) {
      surnameRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.address_2 && formik.touched.address_2) {
      addressRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.city_2 && formik.touched.city_2) {
      cityRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
    if (formik.errors.postalCode_2 && formik.touched.postalCode_2) {
      postalCodeRef?.current?.focus();
      setIsSubmitTriggered(false);
      return
    } 
  }, [formik, submitTriggered])

  return (
    <>
      <CardHeader increment={increment}>
        <ChakraBox display="flex" justifyContent="center" alignItems="center">
          <Checkbox 
            onChange={(e) => {
              setShowAddressSection(e.currentTarget.checked);
              onShowAddressSection(e.currentTarget.checked);
            }} 
            fontWeight="bold"
          >Αποστολή σε διαφορετική διεύθυνση;</Checkbox>
        </ChakraBox>
      </CardHeader>

      {showAddressSection && 
        <ScaleFade unmountOnExit in={true}>
          {/* <AddressSection 
            formik={formik}
          /> */}
          <Stack spacing="3">
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing="5">
              <FormikInputField 
                ref={nameRef}
                label="Όνομα"
                name="name_2"
                formik={formik}
                // isRequired
              />
              <FormikInputField
                ref={surnameRef}
                label="Επίθετο"
                name="surname_2"
                // isRequired
                formik={formik}
              />
            </SimpleGrid>
            <FormikInputField 
              label="Όνομα Εταιρείας (προαιρετικό)"
              name="companyName_2"
              formik={formik}
            />
            <Stack spacing="3">
              <FormikInputField 
                ref={addressRef}
                label="Διεύθυνση"
                name="address_2"
                placeholder="Διεύθυνση και αριθμός"
                isRequired
                formik={formik}
              />
              
            </Stack>
            
            <FormikInputField 
              ref={cityRef}
              label="Πόλη"
              name="city_2"
              isRequired
              formik={formik}
            />
            <FormikInputField 
              ref={regionRef}
              label="Περιοχή"
              name="region_2"
              formik={formik}
              // isRequired
            />
            {/* <CustomSelectField 
              label="Περιφέρεια"
              isRequired
              options={["Αττική", "Εύβοια", "etc"]}
            /> */}
            <FormikInputField 
              ref={postalCodeRef}
              type='string'
              label="Ταχυδρομικός Κώδικας"
              name="postalCode_2"
              isRequired
              formik={formik}
            />
            <FormControl>
              <FormLabel>Σημειώσεις παραγγελίας (προαιρετικό)</FormLabel>
              <Textarea 
                placeholder=""
              />
            </FormControl>
          </Stack>
        </ScaleFade>
      }
      <DeliverySection 
        selectedShippingLine={selectedShippingLine}
        onSelectedShippingLine={onSelectedShippingLine}
      />
    </>
  );
};

interface DeliverySectionProps {
  onSelectedShippingLine: (value: string) => void;
  selectedShippingLine: string
}
const DeliverySection: FC<DeliverySectionProps> = ({ selectedShippingLine, onSelectedShippingLine }) => {
  return (
    <ChakraBox mt="8" py="2" borderTop="1px"  borderColor="gray.200">
      <Wrap justify="space-between" align="center">
        <Text fontSize="md" fontWeight="bold">Αποστολή</Text>

        <RadioGroup onChange={(value) => onSelectedShippingLine(value)} defaultValue={selectedShippingLine}>
          <Stack fontWeight="bold" fontSize="sm" align="flex-end">
            <Radio value="acs_courier">
              <Text align="right">ACS Courier: 3.50&euro;</Text>
            </Radio>
            <Radio value="pay_in_store">
              <Text align="right">Παραλαβή από το Ιατρείο</Text>
            </Radio>
            {/* <Radio value="3">
              <Text align="right">Delivery 2</Text>
            </Radio> */}
          </Stack>
        </RadioGroup>
      </Wrap>
    </ChakraBox>
  )
}

export default Schedules;
