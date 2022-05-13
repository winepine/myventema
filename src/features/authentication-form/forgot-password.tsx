import React, { useContext } from 'react';
import {
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  // Input,
  Button,
  LinkButton,
  Offer,
} from './authentication-form.style';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthContext } from 'contexts/auth/auth.context';
import { Input } from 'components/forms/input';
export default function ForgotPasswordModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const intl = useIntl();
  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading as="h1">
          {/* <FormattedMessage
            id='forgotPassText'
            defaultMessage='Forgot Password'
          /> */}
          Επαναφορά Κωδικού
        </Heading>

        <SubHeading>
          {/* <FormattedMessage
            id='sendResetPassText'
            defaultMessage="We'll send you a link to reset your password"
          /> */}
          Θα σας αποστείλουμε ένα email για την επαναφορά του κωδικού σας
        </SubHeading>

        <Input
          type='text'
          placeholder={intl.formatMessage({
            id: 'emailAddressPlaceholder',
            defaultMessage: 'Email Address or Contact No.',
          })}
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
          {/* <FormattedMessage
            id='resetPasswordBtn'
            defaultMessage='Reset Password'
          /> */}
          Επαναφορά
        </Button>
        <Offer style={{ padding: '20px 0 0' }}>
          {/* <FormattedMessage id='backToSign' defaultMessage='Back to' />{' '} */}
          Πίσω στη
          <LinkButton onClick={toggleSignInForm}>
            {/* <FormattedMessage id='loginBtnText' defaultMessage='Login' /> */}
            Σύνδεση
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
