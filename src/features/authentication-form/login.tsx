// Copied from myventema
import React, { useContext } from 'react';
import {
  LinkButton,
  Button,
  IconWrapper,
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  OfferSection,
  Offer,
  // Input,
  Divider,
} from './authentication-form.style';
import { Facebook } from 'assets/icons/Facebook';
import { Google } from 'assets/icons/Google';
import { AuthContext } from 'contexts/auth/auth.context';
import { FormattedMessage, useIntl } from 'react-intl';
import { closeModal } from '@redq/reuse-modal';
import { Input } from 'components/forms/input';
import { createCustomer, loginCustomer } from 'services/customer';
import { Alert, AlertIcon, useToast } from '@chakra-ui/react';
import axios from 'axios';
import router, { Router } from 'next/router';
import { useSpringModal } from 'contexts/spring-modal/use-spring-modal';
export default function SignInModal() {
  const intl = useIntl();
  const { authDispatch } = useContext<any>(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const { onModalClose } = useSpringModal();

  const toggleSignUpForm = () => {
    authDispatch({
      type: 'SIGNUP',
    });
  };

  const toggleForgotPassForm = () => {
    authDispatch({
      type: 'FORGOTPASS',
    });
  };

  const loginCallback = async (e) => {
    e.preventDefault();

    if (typeof window === "undefined") return;
  
    setIsLoading(true);
    const { customer, error } = await loginCustomer({ email, password });
    
    if (!customer && !!error) {
      setIsError(true);
    }

    if (!error && !!customer) {
       closeModal();  // COMBAK: Sometimes it gives an error...
      toast({
        title: "Είσοδος με επιτυχία!",
        isClosable: true,
        position: 'top',
        status: "success"
      })
      localStorage.setItem("customer", JSON.stringify(customer)); 
      authDispatch({ type: 'SIGNIN_SUCCESS' });
      // Please pay attention on setIsLoading(false) before returning function from this point
    }

    setIsLoading(false);
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id='welcomeBackinGreek' defaultMessage='Σύνδεση' />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id='loginTextInGreek'
            defaultMessage='Συνδεθείτε με το email σας και τον κωδικό πρόσβασης σας'
          />
        </SubHeading>

        {isError && <Alert status="error" mb="4">
          <AlertIcon />
          Ακυρα διαπιστευτήρια!
        </Alert>
        }
        <form onSubmit={loginCallback}>
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

          <Button
            variant='primary'
            size='big'
            style={{ width: '100%' }}
            type='submit'
          >
            <FormattedMessage id={isLoading ? 'loadingBtnInGreek' : 'continueBtnInGreek'} defaultMessage={isLoading ? 'Φόρτωση...' : 'Σύνδεση'} />
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
          onClick={loginCallback}
        >
          <IconWrapper>
            <Facebook />
          </IconWrapper>
          <FormattedMessage
            id='continueFacebookBtn'
            defaultMessage='Σύνδεση με Facebook'
          />
        </Button>

        <Button
          variant='primary'
          size='big'
          style={{ width: '100%', backgroundColor: '#4285f4' }}
          onClick={loginCallback}
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
            id='dontHaveAccountInGreek'
            defaultMessage="Δεν έχετε λογαριασμό?"
          />{' '}
          <LinkButton onClick={toggleSignUpForm}>
            Κάντε Εγγραφή
          </LinkButton>
        </Offer>
      </Container>

      <OfferSection>
        <Offer>
          <FormattedMessage
            id='forgotPasswordTextInGreek'
            defaultMessage='Ξεχάσατε τον κωδικό σας;'
          />{' '}
          <LinkButton onClick={toggleForgotPassForm}>
            <FormattedMessage id='resetTextInGreek' defaultMessage='Επαναφορά' />
          </LinkButton>
        </Offer>
      </OfferSection>
    </Wrapper>
  );
}