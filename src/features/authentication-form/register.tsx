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
      title: "?? ?????????????? ?????????????????? ???? ????????????????!",
      isClosable: true,
      position: 'top',
      status: "success"
    })
  }

  return (
    <Wrapper>
      <Container>
        <Heading as="h1">
          ?????????? ??????????????
        </Heading>
        {isError && <Alert status="error" mb="4">
          <AlertIcon />
          ?????????? ????????????????????????????!
        </Alert>}

        <form onSubmit={handleSubmit}>
          <Input
            type='firstName'
            placeholder={intl.formatMessage({
              id: 'firstNamePlaceholderInGreeek',
              defaultMessage: '??????????',
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
              defaultMessage: '??????????????',
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
              defaultMessage: '?????????????????? ???????????????????????? ????????????????????????.',
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
            placeholder={"?????????????? ??????????????????"}
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
              defaultMessage="???? ?????? ?????????????? ??????, ???????????????????? ???? ????????"
            /> */}
            ???? ?????? ?????????????? ??????, ???????????????????? ???? ????????
            &nbsp;
            <Link href='/'>
              <a>
                {/* <FormattedMessage
                  id='termsConditionTextInGreek'
                  defaultMessage='???????? &amp; ??????????????????'
                /> */}
                 ?????????? ????????????
              </a>
            </Link>
          </HelperText>
          <Button variant='primary' size='big' width='100%' type='submit'>
          <FormattedMessage id={isLoading ? 'loadingBtnInGreek' : 'continueBtnInGreek'} defaultMessage={isLoading ? '??????????????...' : '??????????????'} />
          </Button>
        </form>

        <Divider>
          <span>
            <FormattedMessage id='orTextInGreek' defaultMessage='??' />
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
            defaultMessage='?????????? ?????? ?????????????????????'
          />{' '}
          <LinkButton onClick={toggleSignInForm}>
            <FormattedMessage id='loginBtnTextInGreek' defaultMessage='??????????????' />
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}