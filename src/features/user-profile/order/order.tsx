// Copied from myventema
import React, { useState, useEffect } from "react";
import { Scrollbar } from "components/scrollbar/scrollbar";
import {
  DesktopView,
  MobileView,
  OrderBox,
  OrderListWrapper,
  OrderList,
  OrderDetailsWrapper,
  Title,
  ImageWrapper,
  ItemWrapper,
  ItemDetails,
  ItemName,
  ItemSize,
  ItemPrice,
  NoOrderFound,
} from "./order.style";
import dateFormat from "dateformat";
import { Alert, AlertIcon } from "@chakra-ui/react";

import OrderDetails from "./order-details/order-details";
import OrderCard from "./order-card/order-card";
import OrderCardMobile from "./order-card/order-card-mobile";
import useComponentSize from "utils/useComponentSize";
import { FormattedMessage } from "react-intl";
import useOrders from "data/use-orders";
import ErrorMessage from "components/error-message/error-message";
import useSWR from "swr";
import WooCommerce from "lib/woocommerce";
import { Container } from "@chakra-ui/react";
import Loader from "components/loader/loader";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";
import axios from "axios";

// OLD
// const progressData = ['Order Received', 'Order On The Way', 'Order Delivered'];
// const progressData = ['processing', 'apodoxi', 'completed']

// NEW
// const progressData = ['processing', 'completed', 'deliverycompleted']
const progressData = [
  { label: "Σε επεξεργασία", value: "processing" },
  { label: "Έφυγε", value: "completed" },
  { label: "Έφτασε", value: "deliverycompleted" },
];

const orderTableColumns = [
  {
    title: <FormattedMessage id="cartItems1" defaultMessage="Είδη" />,
    dataIndex: "",
    key: "items",
    width: 250,
    ellipsis: true,
    render: (text, record) => {
      return (
        <ItemWrapper>
          <ImageWrapper>
            <img src={record.image} alt={record.title} />
          </ImageWrapper>

          <ItemDetails>
            <ItemName>{record.title}</ItemName>
            <ItemSize>{record.weight}</ItemSize>
            <ItemPrice>&euro; {record.price}</ItemPrice>
          </ItemDetails>
        </ItemWrapper>
      );
    },
  },
  {
    title: (
      <FormattedMessage id="intlTableColTitwe" defaultMessage="Ποσότητα" />
    ),
    dataIndex: "quantity",
    key: "quantity",
    align: "center",
    width: 100,
  },
  {
    title: <FormattedMessage id="intlTableColTitle3w3" defaultMessage="Τιμή" />,
    dataIndex: "",
    key: "price",
    align: "right",
    width: 100,
    render: (text, record) => {
      return <p>&euro; {record.total}</p>;
    },
  },
];

const OrdersContent: React.FC<{}> = () => {
  const [targetRef, size] = useComponentSize();
  const orderListHeight = size.height - 79;
  const { data: checking, error: sjdf } = useOrders({ userId: 1, limit: 7 });
  const { data, mutate, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/orders?customer=${
      JSON.parse(localStorage.getItem("customer")).id
    }&consumer_key=${
      process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY
    }&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`,
    url => fetch(url).then(res => res.json())
  );
  const [selection, setSelection] = useState(null);
  const [orderProducts, setOrderProducts] = useState([]);
  const [orderStatusIndex, setOrderStatusIndex] = useState(1);
  const [isOrderCanceled, setIsOrderCanceled] = useState(false);

  useEffect(() => {
    if (data?.length) {
      setSelection(data[0]);
    }
  }, [data?.length]);

  useEffect(() => {
    // console.log({ checking, selection });
    if (!selection) return null;

    // console.log({ subTotal: selection.line_items.map(product => product.total).reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)) })

    const products = selection.line_items;
    // console.log({ selection, products });

    getOrderProductsAsync(products);
    getOrderStatus(selection);
  }, [selection]);

  async function getOrderStatus(order) {
    const status = order.status;

    if (
      status === "cancelled" ||
      status === "deliverydenied" ||
      status === "failed"
    ) {
      setIsOrderCanceled(true);

      return;
    }

    const index = progressData.findIndex(step => step.value === status);
    setOrderStatusIndex(index + 1);
  }

  async function getOrderProductsAsync(productsData) {
    let products = [];
    try {
      products = await Promise.all(
        productsData.map(async productData => {
          // const { data: product } = await WooCommerce.get(`products/${productData.product_id}`);
          const { data: product } = await axios.get(
            `${siteURL}/wp-json/wc/v3/products/${productData.product_id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
          );
          return product;
        })
      );
    } catch (error) {
      console.log("/order -> getOrderProductsAsync :: ", { error });
      setOrderProducts([]);
      return;
    }

    const schemaProducts = await productsData.map((product: any) => {
      const targetProduct: any = products.find(
        (prod: any) => prod.id === product.product_id
      );
      const imgURL = targetProduct?.images?.[0].src;

      return {
        id: product.id,
        // image: product.images?.[0]?.src,
        image: imgURL,
        price: product.price,
        title: product.name,
        total: product.total,
        quantity: product.quantity,
      };
    });
    setOrderProducts(schemaProducts);
  }

  console.log({ orderStatusIndex });

  // console.log({ data2, error2, data });
  // if (error) return <ErrorMessage message={error.message} />;
  if (!data)
    return (
      <Container centerContent>
        <Loader />
      </Container>
    );

  return (
    <OrderBox>
      <DesktopView>
        <OrderListWrapper style={{ height: size.height }}>
          <Title style={{ padding: "0 20px" }}>
            <FormattedMessage
              id="Οι παραγγελίες μου"
              defaultMessage="Οι παραγγελίες μου"
            />
          </Title>

          <Scrollbar className="order-scrollbar">
            <OrderList>
              {data.length !== 0 ? (
                data.map((current: any) => (
                  <OrderCard
                    key={current.id}
                    orderId={current.id}
                    className={current.id === selection?.id ? "active" : ""}
                    // status={current.status}
                    status={
                      isOrderCanceled
                        ? "ακυρώθηκε"
                        : progressData[orderStatusIndex - 1].label
                    }
                    // date={current.date_created}
                    // date={dateFormat(current.date_created, "ddd mmm dd, yyyy")}
                    date={dateFormat(current.date_created, "dd/mm/yyyy")}
                    deliveryTime={"1-3 εργάσιμες"}
                    amount={current.total}
                    onClick={() => setSelection(current)}
                  />
                ))
              ) : (
                <NoOrderFound>
                  <FormattedMessage
                    id="intlNoOrderFound123"
                    defaultMessage="Δεν βρέθηκε παραγγελία"
                  />
                </NoOrderFound>
              )}
            </OrderList>
          </Scrollbar>
        </OrderListWrapper>

        <OrderDetailsWrapper ref={targetRef}>
          {!isOrderCanceled ? (
            <>
              <Title style={{ padding: "0 20px" }}>
                <FormattedMessage
                  id="orderDetailsText123123123"
                  defaultMessage="Λεπτομέρειες Παραγγελίας"
                />
              </Title>
              {/* //NOTE: Whenever you make changes here, make sure to change for mobile as well */}
              {selection && (
                <OrderDetails
                  progressStatus={orderStatusIndex}
                  progressData={progressData}
                  address={`${selection.shipping?.address_1} ${selection.shipping?.postcode}`}
                  subtotal={
                    selection.line_items
                      .map(product => product.total)
                      .reduce(
                        (accumulator, currentValue) =>
                          parseFloat(accumulator) + parseFloat(currentValue)
                      ) || "?"
                  }
                  discount={0}
                  deliveryFee={selection.shipping_total}
                  grandTotal={selection.total}
                  tableData={orderProducts}
                  columns={orderTableColumns}
                />
              )}
            </>
          ) : (
            <>
              <Alert minW="30rem" status="error">
                <AlertIcon />Η παραγγελία αυτή έχει ακυρωθεί!
              </Alert>
            </>
          )}
        </OrderDetailsWrapper>
      </DesktopView>

      <MobileView>
        {data.length !== 0 ? (
          <OrderList>
            <OrderCardMobile
              orders={data}
              isOrderCanceled={isOrderCanceled}
              // className={order && order.id === active ? 'active' : ''}
              tableData={orderProducts}
              progressData={progressData}
              columns={orderTableColumns}
              onClick={setSelection}
            />
          </OrderList>
        ) : (
          <Alert status="warning" w={{ base: "full", md: "max" }}>
            <AlertIcon />
            Δεν βρέθηκε παραγγελία...
          </Alert>
        )}
      </MobileView>

      {/* <MobileView>
        <OrderList>
          <OrderCardMobile
            orders={data}
            isOrderCanceled={isOrderCanceled}
            // className={order && order.id === active ? 'active' : ''}
            tableData={orderProducts}
            progressData={progressData}
            columns={orderTableColumns}
            onClick={setSelection}
          />
        </OrderList>
      </MobileView> */}
    </OrderBox>
  );
};

export default OrdersContent;
