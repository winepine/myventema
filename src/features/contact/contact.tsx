import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import RadioGroup from 'components/radio-group/radio-group';
import RadioCard from 'components/radio-card/radio-card';
import { Button } from 'components/button/button';
import { handleModal } from 'features/checkouts/checkout-modal';
// import { ProfileContext } from 'contexts/profile/profile.context';
import useUser from 'data/use-user';
import CreateOrUpdateContact from 'components/contact-card/contact-card';
import { CardHeader } from 'components/card-header/card-header';
import { ButtonGroup } from 'components/button-group/button-group';
import { Box } from 'components/box';
import { Plus } from 'assets/icons/PlusMinus';
import useCustomer from 'hooks/useCustomer';
interface Props {
  increment?: boolean;
  flexStart?: boolean;
  icon?: boolean;
  buttonProps?: any;
}

const Contact = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: 'big',
    variant: 'outlined',
    type: 'button',
    className: 'add-button',
  },
}: Props) => {
  // const [items, setItems] = useState([]);
  const { primaryPhone, setPrimaryPhone, secondaryPhone, setSecondaryPhone } = useCustomer();

  const ITEMS = [
    // {id: '1', type: 'primary', number: '202-555-0701'},
    // {id: '2', type: 'secondary', number: '202-555-245'},
    {id: '1', type: 'primary', number: primaryPhone || "000-000-0000"},
    {id: '2', type: 'secondary', number: secondaryPhone || "000-000-0000"},
  ]

  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id='contactNumberText'
          defaultMessage='Select Your Contact Number'
        />
      </CardHeader>
      <RadioGroup
        items={ITEMS}
        component={(item: any) => {
          console.log({ item });

          return (
            <RadioCard
              id={item.id}
              key={item.id}
              title={item.type}
              content={item.number}
              checked={item.type === 'primary'}
              onChange={() =>console.log("temp")
                // dispatch({
                //   type: 'SET_PRIMARY_CONTACT',
                //   payload: item.id.toString(),
                // })
              }
              name='contact'
              onEdit={() => handleModal(CreateOrUpdateContact, { primaryPhone })}
            />
          )
        }}
          // secondaryComponent={
          //   <Button
          //     {...buttonProps}
          //     onClick={() =>
          //       handleModal(CreateOrUpdateContact, 'add-contact-modal')
          //     }
          //   >
          //     {icon && (
          //       <Box mr={2}>
          //         <Plus width='10px' />
          //       </Box>
          //     )}
          //     <FormattedMessage
          //       id='addContactBtn'
          //       defaultMessage='Add Contact'
          //     />
          //   </Button>
          // }
        />
    </>
  );
};

export default Contact;
