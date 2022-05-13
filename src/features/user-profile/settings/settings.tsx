import React, { useContext, useEffect, useState } from 'react';
// import { ProfileContext } from 'contexts/profile/profile.context';
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
} from './settings.style';
import { Button } from 'components/button/button';
import { Input } from 'components/forms/input';
import { FormattedMessage } from 'react-intl';
import { Label } from 'components/forms/label';
import Contact from 'features/contact/contact';
import Address from 'features/address/address';
import Payment from 'features/payment/payment';
import { CardHeader } from 'components/card-header/card-header';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import useCustomer from 'hooks/useCustomer';
import { updateCustomer } from 'services/customer';
import { useToast } from '@chakra-ui/toast';
import Router from 'next/router';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const toast = useToast()
  const { 
    id,
    name, 
    surname, 
    email, 
    primaryPhone, 
    secondaryPhone, 
    address, 
    city, 
    postalCode, 
    region,
    setName,
    setSurname,
    setEmail,
    setPrimaryPhone,
    setSecondaryPhone,
    setAddress,
    setCity,
    setPostalCode,
    setRegion
  } = useCustomer();
  const [isLoading, setIsLoading] = useState(false);
  
  console.log({ id, name, surname, email, primaryPhone, secondaryPhone, address, city, postalCode, region });

  const handleSave = async () => {
    setIsLoading(true);

    const { customer, error } = await updateCustomer({ id, name, surname, email, primaryPhone, secondaryPhone, address, city, postalCode, region })
    
    if (!customer && !!error) {
      setIsLoading(false);
      toast({
        title: "Something went wrong...",
        isClosable: true,
        position: 'top',
        status: "error"
      })
      return;
    }
    
    localStorage.setItem("customer", JSON.stringify(customer));
    setIsLoading(false);
    toast({
      title: "Customer registered successfully!",
      isClosable: true,
      position: 'top',
      status: "success"
    })

    Router.reload();
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage
              id='profilePageTitle1'
              defaultMessage='Προφίλ'
            />
          </Title>
        </HeadingSection>

        {/* Name and email */}
        <SimpleGrid pb="14" spacing="4" columns={{ base: 1, md: 2 }}>
          <Stack spacing="0">
            <Label>
              <FormattedMessage
                id='profileNameField1'
                defaultMessage='Όνομα'
              />
            </Label>
            <Input
              type='text'
              label='Name'
              name='name'
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Stack>

          <Stack spacing="0">
            <Label>
              <FormattedMessage
                id='profileSurnameField1'
                defaultMessage='Επίθετο'
              />
            </Label>
            <Input
              type='text'
              name='surname'
              label='Surname'
              value={surname}
              onChange={(e) => setSurname(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
            />
          </Stack>
        </SimpleGrid>
        <SimpleGrid pb="14"  spacing="4" columns={{ base: 1, md: 1 }}>
          <Stack spacing="0">
            <Label>
              <FormattedMessage
                id='primaryPhone1'
                defaultMessage='Αριθμός Τηλεφώνου'
              />
            </Label>
            <Input
              placeholder="Primary phone"
              type='number'
              label='Primary'
              name='primary'
              value={primaryPhone}
              onChange={(e) => setPrimaryPhone(e.currentTarget.value)}
              backgroundColor='#F7F7F7'
              height='48px'
            />
          </Stack>
        </SimpleGrid>


        {/* Temporarily muted due to error of formit */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              {/* <Address /> */}
              <CardHeader>
                <FormattedMessage
                  id='checkoutDeliveryAddress1'
                  defaultMessage='Διεύθυνση'
                />
              </CardHeader>

              <SimpleGrid spacing="4" columns={{ base: 1, md: 2 }}>
                <Input 
                  placeholder="Street Address"
                  backgroundColor='#F7F7F7'
                  value={address}
                  onChange={(e) => setAddress(e.currentTarget.value)}
                />
                <Input 
                  placeholder="City"
                  backgroundColor='#F7F7F7'
                  value={city}
                  onChange={(e) => setCity(e.currentTarget.value)}
                />
                <Input 
                  placeholder="Postal Code"
                  backgroundColor='#F7F7F7'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.currentTarget.value)}
                />
                <Input 
                  placeholder="Region"
                  backgroundColor='#F7F7F7'
                  value={region}
                  onChange={(e) => setRegion(e.currentTarget.value)}
                />
              </SimpleGrid>
            </SettingsFormContent>
          </Col>
        </Row>

        {/* 
          1- Just hidding not removing, because we may need to inspect whenever we will confuse in any type of compiler confusion! 
          2- May be in future, we need this row and we can copy from here and paste anywhere so it will save our time and cost 😃 
        */}
        {/* <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <Payment deviceType={deviceType} />
            </SettingsFormContent>
          </Col>
        </Row> */}

            
        <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
          {/* <FormattedMessage id='profileSaveBtn' defaultMessage='Save' /> */}
          <FormattedMessage id={isLoading ? 'loadingBtnInGreek' : 'profileSaveBtnInGreek'} defaultMessage={isLoading ? 'Φορτώνει…' : 'Αποθήκευση'} />
        </Button>
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
