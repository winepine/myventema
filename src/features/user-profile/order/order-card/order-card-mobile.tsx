import React from 'react';
import Table from 'rc-table';
import Collapse, { Panel } from 'rc-collapse';
import Progress from 'components/progress-box/progress-box';

import {
  OrderListHeader,
  TrackID,
  Status,
  OrderMeta,
  Meta,
  CardWrapper,
  OrderDetail,
  DeliveryInfo,
  DeliveryAddress,
  Address,
  CostCalculation,
  PriceRow,
  Price,
  ProgressWrapper,
  OrderTable,
  OrderTableMobile,
} from './order-card.style';
import dateFormat from 'dateformat'
import {
  Alert,
  AlertIcon,
} from "@chakra-ui/react"

import { CURRENCY } from 'utils/constant';

type MobileOrderCardProps = {
  orderId?: any;
  onClick?: (e: any) => void;
  className?: any;
  status?: any;
  date?: any;
  deliveryTime?: any;
  amount?: number;
  tableData?: any;
  columns?: any;
  progressData?: any;
  progressStatus?: any;
  address?: string;
  subtotal?: number;
  discount?: number;
  deliveryFee?: number;
  grandTotal?: number;
  orders?: any;
  isOrderCanceled: boolean
};

const components = {
  table: OrderTable,
};

const OrderCard: React.FC<MobileOrderCardProps> = ({
  onClick,
  className,
  columns,
  progressData,
  orders,
  tableData,
  isOrderCanceled
}) => {

  return (
    <>
      <Collapse
        accordion={true}
        className={`accordion ${className}`}
        defaultActiveKey="active"
      >
        {orders.map((order: any) => {
          const currStatus = progressData.findIndex(step => step.value === order.status)
          let status = progressData[currStatus];

          // console
          console.log({ progressData, status, currStatus });

          // return null;
          if (isOrderCanceled) {
            status = { label: "ακυρώθηκε" }
          }

          return (
            <Panel
              header={
                <CardWrapper onClick={() => onClick(order)}>
                  <OrderListHeader>
                    <TrackID>
                    Παραγγελία <span>#{order.id}</span>
                    </TrackID>
                    {/* <Status>{progressData[order.status - 1]}</Status> */}
                    <Status>{status?.label}</Status>
                  </OrderListHeader>
  
                  <OrderMeta>
                    <Meta>
                      Ημερομηνία παραγγελίας: <span>{dateFormat(order.date_created, "ddd mmm dd, yyyy")}</span>
                    </Meta>
                    <Meta>
                    Χρόνος παράδοσης: <span>{"1-3 εργάσιμες"}</span>
                    </Meta>
                    <Meta className="price">
                      Συνολικό ποσό:
                      <span>
                        {CURRENCY}
                        {order.total}
                      </span>
                    </Meta>
                  </OrderMeta>
                </CardWrapper>
              }
              headerClass="accordion-title"
              key={order.id}
            >
              <OrderDetail>
                {!isOrderCanceled ? <>
                <DeliveryInfo>
                  <DeliveryAddress>
                    <h3>Διεύθυνση παράδοσης</h3>
                    <Address>{order.shipping?.address_1}</Address>
                  </DeliveryAddress>
  
                  <CostCalculation>
                    <PriceRow>
                      Υποσύνολο
                      <Price>
                        {CURRENCY}
                        {order.line_items.map(product => product.total).reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)) || "?"}
                      </Price>
                    </PriceRow>
                    <PriceRow>
                      Έκπτωση
                     <Price>
                        {CURRENCY}
                        {0}
                      </Price>
                    </PriceRow>
                    <PriceRow>
                    Κόστος παράδοσης
                      <Price>
                        {CURRENCY}
                        {order.shipping_total}
                      </Price>
                    </PriceRow>
                    <PriceRow className="grandTotal">
                    Σύνολο
                      <Price>
                        {CURRENCY}
                        {order.total}
                      </Price>
                    </PriceRow>
                  </CostCalculation>
                </DeliveryInfo>
  
                <ProgressWrapper>
                  <Progress data={progressData} status={currStatus + 1} />
                </ProgressWrapper>
  
                <OrderTableMobile>
                  <Table
                    columns={columns}
                    data={tableData}
                    rowKey={(record) => record.id}
                    components={components}
                    scroll={{ x: 450 }}
                    // scroll={{ y: 250 }}
                  />
                </OrderTableMobile>
                </> :
                <Alert status="error">
                  <AlertIcon />
                  Η παραγγελία αυτή έχει ακυρωθεί!
                </Alert>}
              </OrderDetail>
            </Panel>
          )
        })}
      </Collapse>
    </>
  );
};

export default OrderCard;
