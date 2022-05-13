import React from 'react';
import {
  SingleOrderList,
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
} from './order-card.style';
import { FormattedMessage } from 'react-intl';

import { CURRENCY } from 'utils/constant';

type OrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  onClick,
  className,
  status,
  date,
  deliveryTime,
  amount,
}) => {
  return (
    <>
      <SingleOrderList onClick={onClick} className={className}>
        <OrderListHeader>
          <TrackID>
            <FormattedMessage
              id="intlOrderCardTitleTexterwer"
              defaultMessage="Παραγγελία"
            />
            <span>#{orderId}</span>
          </TrackID>
          <Status>{status}</Status>
        </OrderListHeader>

        <OrderMeta>
          <Meta>
            <FormattedMessage
              id="intlOrderCardDateTextt"
              defaultMessage="Ημερομηνία Παραγγελίας"
            />
            : <span>{date}</span>
          </Meta>
          <Meta>
            <FormattedMessage
              id="deliveryTimeTexttt"
              defaultMessage="Χρόνος Παράδοσης"
            />
            : <span>{deliveryTime}</span>
          </Meta>
          <Meta className="price">
            <FormattedMessage
              id="intlOrderCardTotalText234"
              defaultMessage="Ποσό"
            />
            :
            <span>
              {CURRENCY}
              {amount}
            </span>
          </Meta>
        </OrderMeta>
      </SingleOrderList>
    </>
  );
};

export default OrderCard;
