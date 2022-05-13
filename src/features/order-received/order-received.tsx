import React from 'react';
import Link from 'next/link';
import OrderReceivedWrapper, {
  OrderReceivedContainer,
  OrderInfo,
  OrderDetails,
  TotalAmount,
  BlockTitle,
  Text,
  InfoBlockWrapper,
  InfoBlock,
  ListItem,
  ListTitle,
  ListDes,
} from './order-received.style';
import { FormattedMessage } from 'react-intl';
import dateFormat from 'dateformat'
import currencyFormatter from 'currency-formatter'
import { useState } from 'react';
import { useEffect } from 'react';

type OrderReceivedProps = {
  order?: any
};

const OrderReceived: React.FunctionComponent<OrderReceivedProps> = ({ order }) => {
  const [itemsPriceTotal, setItemsPriceTotal] = useState(0);
  console.log({ order });

  useEffect(() => {
    if (order?.line_items.length === 0) {
      setItemsPriceTotal(0);
      return;
    }

    const total = order?.line_items.map(item => parseFloat(item.total)).reduce((acc, curr) => acc + curr);
    setItemsPriceTotal(total);
  }, [])

  return (
    <OrderReceivedWrapper>
      <OrderReceivedContainer>
        <Link href="/">
          <a className="home-btn">
            <FormattedMessage id="backHomeBtnInGreek" defaultMessage="Πίσω στην Αρχική Σελίδα" />
          </a>
        </Link>

        <OrderInfo>
          <BlockTitle>
            <FormattedMessage
              id="orderReceivedTextInGreek"
              defaultMessage="Η Παραγγελία Καταχωρήθηκε"
            />
          </BlockTitle>

          <Text>
            <FormattedMessage
              id="orderReceivedSuccessInGreek"
              defaultMessage="Ευχαριστούμε! Λάβαμε την παραγγελία σας"
            />
          </Text>

          <InfoBlockWrapper>
            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="orderNumberTextInGreek"
                  defaultMessage="Αριθμός Παραγγελίας"
                />
              </Text>
              <Text>{`#${order.id}`}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="orderDateTextInGreek" defaultMessage="Ημερομηνία" />
              </Text>
              <Text>{dateFormat(order.date_created, "fullDate")}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage id="totalTextInGreek" defaultMessage="Σύνολο" />
              </Text>
              <Text>&euro; {currencyFormatter.format(order.total, {})}</Text>
            </InfoBlock>

            <InfoBlock>
              <Text bold className="title">
                <FormattedMessage
                  id="paymenMethodText"
                  defaultMessage="Μέθοδος πληρωμής"
                />
              </Text>
              <Text>
                <FormattedMessage
                  id={order.payment_method_title}
                  defaultMessage={order.payment_method_title}
                />
              </Text>
            </InfoBlock>
          </InfoBlockWrapper>
        </OrderInfo>

        {/* Bank details */}
        {order?.payment_method === "bacs" && <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="bankDetails"
              defaultMessage="Τραπεζικοί Λογαριασμοί"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="accountHolderText"
                  defaultMessage="Account Holder"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{"Random name"}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="ibanText"
                  defaultMessage="IBAN"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{"IBAN1231231231231231"}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="bankNameText"
                  defaultMessage="Bank Name"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {"AS SEB Pank"}
              </Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="bankDetailText"
                  defaultMessage="Bank Address"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {"Bank address"}
              </Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="swiftText"
                  defaultMessage="SWIFT"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {"EEUDICN12"}
              </Text>
            </ListDes>
          </ListItem>
        </OrderDetails>}

        <OrderDetails>
          <BlockTitle>
            <FormattedMessage
              id="orderDetailsTextInGreek"
              defaultMessage="Πληροφορίες Παραγγελίας"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="totalItemTextInGreek"
                  defaultMessage="Σύνολο Προϊόντων"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{order.line_items.length} {order.line_items.length > 1 ? "προϊόντα" : "προϊόν"}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="orderTimeTextInGreek"
                  defaultMessage="Ημερομηνία Παραγγελίας"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{dateFormat(order.date_created, "mmm dd, yyyy - HH:MM:ss")}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="deliveryLocationTextInGreek"
                  defaultMessage="Διεύθυνση Αποστολής"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>
                {`${order.shipping.address_1} ${order.shipping.postcode}`}
              </Text>
            </ListDes>
          </ListItem>
        </OrderDetails>

        <TotalAmount>
          <BlockTitle>
            <FormattedMessage
              id="totalAmountTextInGreek"
              defaultMessage="Ποσό"
            />
          </BlockTitle>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="subTotalInGreek" defaultMessage="Υποσύνολο" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>&euro; {currencyFormatter.format(itemsPriceTotal, {})}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymenMethodTextINGreek"
                  defaultMessage="Μέθοδος Πληρωμής"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>{order.payment_method_title}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage
                  id="paymentMethodNameInGreek"
                  defaultMessage="Χρεώση Αποστολής"
                />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>&euro; {currencyFormatter.format(order.shipping_total, {})}</Text>
            </ListDes>
          </ListItem>

          <ListItem>
            <ListTitle>
              <Text bold>
                <FormattedMessage id="totalTextINGreek" defaultMessage="Σύνολο" />
              </Text>
            </ListTitle>
            <ListDes>
              <Text>&euro; {currencyFormatter.format(order.total, {})}</Text>
            </ListDes>
          </ListItem>
        </TotalAmount>
      </OrderReceivedContainer>
    </OrderReceivedWrapper>
  );
};

export default OrderReceived;
