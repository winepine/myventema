// Copied from myventema
import React, { useContext } from 'react';
import Link from 'next/link';
import { Input } from 'components/forms/input';
import {
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  HelperText,
  Offer,
  // Input,
  Divider,
  LinkButton,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { useState } from 'react';
import { createCustomer } from 'services/customer';
import { closeModal } from '@redq/reuse-modal';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function SignOutModal() {
  const toast = useToast()
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };

  const handleSubmit = async (e) => {
    setIsError(false);
    e.preventDefault();

    setIsLoading(true);

    console.log("I am register button submittion", { first_name: firstName, last_name: lastName, email, password  });
    const { customer, error } = await createCustomer({ first_name: firstName, last_name: lastName, email, password });
    // console.log({ customer, error })

    
    if (!customer && !!error) {
      setIsLoading(false);
      setIsError(true);
      return;
    }
    
    // Remove mongodb
    // await axios.post("api/customers", { ...customer, password });
    
    // setIsError(true);

    closeModal();
    localStorage.setItem("customer", JSON.stringify(customer));
    authDispatch({ type: 'SIGNIN_SUCCESS' });
    toast({
      title: "Ο πελάτης εγγράφηκε με επιτυχία!",
      isClosable: true,
      position: 'top',
      status: "success"
    })
  }

  return (
    <Wrapper>
      <Container>
        <Heading as="h1">
          Κάντε Εγγραφή
        </Heading>
        {isError && <Alert status="error" mb="4">
          <AlertIcon />
          Ακυρα διαπιστευτήρια!
        </Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            type='firstName'
            placeholder={intl.formatMessage({
              id: 'firstNamePlaceholderInGreeek',
              defaultMessage: 'Ονομα',
            })}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Input
            type='lastName'
            placeholder={intl.formatMessage({
              id: 'lastNamePlaceholderInGreek',
              defaultMessage: 'Επίθετο',
            })}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Input
            type='email'
            placeholder={intl.formatMessage({
              id: 'emailAddressPlaceholderInGreek',
              defaultMessage: 'Διεύθυνση ηλεκτρονικού ταχυδρομείου.',
            })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <Input
            type='password'
            placeholder={"Κωδικός πρόσβασης"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            height='48px'
            backgroundColor='#F7F7F7'
            mb='10px'
          />
          <HelperText style={{ padding: '20px 0 30px' }}>
            {/* <FormattedMessage
              id='signUpTextInGrrek'
              defaultMessage="Με την εγγραφή σας, συμφωνείτε με τους"
            /> */}
            Με την εγγραφή σας, συμφωνείτε με τους
            &nbsp;
            <Link href='/'>
              <a>
                {/* <FormattedMessage
                  id='termsConditionTextInGreek'
                  defaultMessage='Οροι &amp; Κατάσταση'
                /> */}
                 Όρους Χρήσης
              </a>
            </Link>
          </HelperText>
          <Button variant='primary' size='big' width='100%' type='submit'>
          <FormattedMessage id={isLoading ? 'loadingBtnInGreek' : 'continueBtnInGreek'} defaultMessage={isLoading ? 'Φόρτωση...' : 'Εγγραφή'} />
          </Button>
        </form>

        <Divider>
          <span>
            <FormattedMessage id='orTextInGreek' defaultMessage='ή' />
          </span>
        </Divider>
        {/* <Button
          variant='primary'
          size='big'
          style={{
            width: '100%',
            backgroundColor: '#4267b2',
            marginBottom: 10,
          }}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id='continueFacebookBtn'
            defaultMessage='Continue with Facebook'
          />
        </Button>
        <Button
          variant='primary'
          size='big'
          style={{ width: '100%', backgroundColor: '#4285f4' }}
        >
          <IconWrapper>
            <Google />
          </IconWrapper>
          <FormattedMessage
            id='continueGoogleBtn'
            defaultMessage='Continue with Google'
          />
        </Button> */}
        <Offer style={{ padding: '20px 0' }}>
          <FormattedMessage
            id='alreadyHaveAccountInGreek'
            defaultMessage='Έχετε ήδη λογαριασμό?'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnTextInGreek' defaultMessage='Σύνδεση' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}