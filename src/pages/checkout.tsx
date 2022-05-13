import React from 'react';
import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { SEO } from 'components/seo';
import Checkout from 'features/checkouts/checkout-two/checkout-two';
import ErrorMessage from 'components/error-message/error-message';
import useUser from 'data/use-user';
import { NextSeo } from 'next-seo'

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  const { user, error } = useUser();
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <div>loading...</div>;

  const token = 'true';

  return (
    <>
      <NextSeo title="Ταμείο - All4Skin" />
      <Modal>
        <Checkout token={token} deviceType={deviceType} />
      </Modal>
    </>
  );
};

export default CheckoutPage;
