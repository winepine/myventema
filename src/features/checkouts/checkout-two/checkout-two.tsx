import React, { useContext, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "components/button/button";
import { CURRENCY } from "utils/constant";
import { Scrollbar } from "components/scrollbar/scrollbar";
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  CouponCode,
  RemoveCoupon,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
} from "./checkout-two.style";

import { NoCartBag } from "assets/icons/NoCartBag";

import Sticky from "react-stickynode";
// import { ProfileContext } from 'contexts/profile/profile.context';
import { FormattedMessage } from "react-intl";
import { useCart } from "contexts/cart/use-cart";
import { useLocale } from "contexts/language/language.provider";
import { useWindowSize } from "utils/useWindowSize";
import Coupon from "features/coupon/coupon";
import Schedules from "features/schedule/schedule";
import Contact from "features/contact/contact";
import Payment from "features/payment/payment";
import Address from "features/address/address";
import {
  Checkbox,
  Box as ChakraBox,
  chakra,
  Button as ChakraButton,
  Container as ChakraContainer,
  Alert as ChakraAlert,
  AlertIcon as ChakraAlertIcon,
  Link as ChakraLink,
  useToast,
  HStack,
  Wrap,
  Heading,
  Text as ChakraText,
  Stack,
} from "@chakra-ui/react";
import CustomInputField from "components/common/CustomInputField";
import { useRef } from "react";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import { FaLock, FaUser } from "react-icons/fa";
import { createOrder } from "services/order";
import currencyFormatter from "currency-formatter";
import OrderBump from "components/common/OrderBump";
import { useAppState } from "contexts/app/app.provider";

// The type of props Checkout Form receives
interface MyFormProps {
  token: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, quantity, title, name, unit, price, salePrice } = product;
  const displayPrice = salePrice ? salePrice : price;
  return (
    <Items key={id}>
      <Quantity>{quantity}</Quantity>
      <Multiplier>x</Multiplier>
      <ItemInfo>
        {name ? name : title} {unit ? `| ${unit}` : ""}
      </ItemInfo>
      <Price>
        {CURRENCY}
        {(displayPrice * quantity).toFixed(2)}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const router = useRouter();
  const [hasCoupon, setHasCoupon] = useState(false);
  // const { state } = useContext(ProfileContext);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const regionRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const {
    items: data,
    removeCoupon,
    coupon,
    clearCart,
    cartItemsCount,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showOtherAddressSection, setShowOtherAddressSection] = useState(false);
  const [agreedOnTermsAndCondtions, setAgreedOnTermsAndCondtions] =
    useState(false);
  const [isSubmitTriggered, setIsSubmitTriggered] = useState(false);
  // const { address, contact, card, schedules } = state;
  const [isSuccess, setIsSuccess] = useState(false);
  const size = useWindowSize();
  const [items, setItems] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState({});
  const toast = useToast();
  const [selectedPaymentOptionValue, setSelectedPaymentOptionValue] =
    useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const isCheckoutCartShow = useAppState("isCheckoutCartShow");
  const [selectedShippingLine, setSelectedShippingLine] =
    useState("acs_courier");

  const loggedInCustomer = JSON.parse(localStorage.getItem("customer"));

  useEffect(() => {
    return () => {
      // if (isRestaurant) {
      // toggleRestaurant();
      if (isSuccess) {
        clearCart();
      }
      // }
    };
  }, [isSuccess]);

  useEffect(() => {
    setLoading(true);
    setItems(data);

    setTimeout(() => {
      setLoading(false);
      // setItems(data)
    }, 1200);
  }, [data]);

  // For total price after adding or removing delivery charges and courier charges
  useEffect(() => {
    const itemsTotal = parseFloat(calculatePrice());
    const courierCharges = selectedShippingLine === "acs_courier" ? 3 : 0.0;
    const deliveryCharges =
      selectedPaymentOptionValue === "pay on delivery" ? 2.0 : 0;

    const total = itemsTotal + courierCharges + deliveryCharges;
    setTotalAmount(total.toString());

    // console.log({ itemsTotal, courierCharges, deliveryCharges })
  }, [selectedPaymentOptionValue, selectedShippingLine]);

  function handlePaymentConfirm(options) {
    setPaymentOptions(options);
  }

  function handlePaymentOptionValue(value) {
    setSelectedPaymentOptionValue(value);
  }

  if (!loading && items?.length === 0)
    return (
      <ChakraContainer maxW="container.lg" mt="20" mb="10" py="8">
        <ChakraAlert status="error">
          <ChakraAlertIcon />
          You haven't add any products in your cart yet.{" "}
          <ChakraLink ml="2" onClick={() => router.replace("/")}>
            {" "}
            Please add some products from here{" "}
          </ChakraLink>
        </ChakraAlert>
      </ChakraContainer>
    );

  if (items?.length > 0)
    return (
      <Formik
        initialValues={{
          email: loggedInCustomer?.email ?? "",
          password: "",
          confirmPassword: "",
          name: loggedInCustomer?.first_name ?? "",
          surname: loggedInCustomer?.last_name ?? "",
          address: loggedInCustomer?.shipping?.address_1 ?? "",
          city: loggedInCustomer?.shipping?.city ?? "",
          region: loggedInCustomer?.shipping?.state ?? "",
          postalCode: loggedInCustomer?.shipping?.postcode ?? "",
          phoneNumber: loggedInCustomer?.shipping?.phone ?? "",
          name_2: "",
          surname_2: "",
          companyName_2: "",
          address_2: "",
          pinAddress_2: "",
          city_2: "",
          postalCode_2: "",
        }}
        onSubmit={async values => {
          setOrderLoading(true);
          const res = await createOrder(
            {
              ...values,
              paymentOptions,
              selectedShippingLine,
              selectedPaymentOptionValue,
            },
            items
          );

          if (res.status === 201) {
            setIsSuccess(true);
            setLoading(false);
            localStorage.setItem("order", JSON.stringify(res.resData));

            setTimeout(() => {
              clearCart();
            }, 100);

            // router.push(`/thankyou?order=${res.resData.number}`)
            Router.replace("/order-received");
          } else {
            toast({
              title: "Oops! Something went wrong...",
              position: "top",
              isClosable: true,
              status: "error",
            });
          }

          setOrderLoading(false);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required().label("Email"),
          password: showPasswordFields
            ? Yup.string().required().min(4).max(6).label("Password")
            : null,
          confirmPassword: showPasswordFields
            ? Yup.string().required().min(4).max(6).label("Confirm password")
            : null,
          name: Yup.string().label("Name"),
          surname: Yup.string().label("Surname"),
          address: Yup.string().required().min(4).label("Address"),
          city: Yup.string().required().min(4).label("City"),
          region: Yup.string().label("Region"),
          postalCode: Yup.string()
            .required()
            .length(5, "Postal code must be exactly 5 digits")
            .label("Postal code"),
          phoneNumber: Yup.string().required().length(10).label("Phone number"),
          name_2: showOtherAddressSection ? Yup.string().label("Name") : null,
          surname_2: showOtherAddressSection
            ? Yup.string().label("Surname")
            : null,
          companyName_2: showOtherAddressSection
            ? Yup.string().label("Company name")
            : null,
          address_2: showOtherAddressSection
            ? Yup.string().required().label("Address / Region")
            : null,
          pinAddress_2: showOtherAddressSection
            ? Yup.string().label("Pin address")
            : null,
          city_2: showOtherAddressSection
            ? Yup.string().required().label("City / Town")
            : null,
          postalCode_2: showOtherAddressSection
            ? Yup.string()
                .required()
                .length(5, "Postal code must be exactly 5 digits")
                .label("Postal code")
            : null,
        })}
      >
        {props => {
          return (
            <chakra.form
              onSubmit={e => {
                e.preventDefault();

                props.handleSubmit();
                setIsSubmitTriggered(true);
              }}
            >
              <CheckoutWrapper>
                <CheckoutContainer>
                  <CheckoutInformation>
                    {/* DeliveryAddress */}
                    <InformationBox>
                      <Address
                        formik={props}
                        submitTriggered={isSubmitTriggered}
                        setIsSubmitTriggered={setIsSubmitTriggered}
                        increment={true}
                        flexStart={true}
                        buttonProps={{
                          variant: "text",
                          type: "button",
                          className: "addButton",
                        }}
                        icon={true}
                        onCreateAccountCheck={isChecked =>
                          setShowPasswordFields(isChecked)
                        }
                      />
                    </InformationBox>

                    {/* DeliverySchedule */}
                    <InformationBox>
                      <DeliverySchedule>
                        <Schedules
                          formik={props}
                          submitTriggered={isSubmitTriggered}
                          setIsSubmitTriggered={setIsSubmitTriggered}
                          increment={true}
                          selectedShippingLine={selectedShippingLine}
                          onShowAddressSection={isChecked =>
                            setShowOtherAddressSection(isChecked)
                          }
                          onSelectedShippingLine={selectedValue =>
                            setSelectedShippingLine(selectedValue)
                          }
                        />
                      </DeliverySchedule>
                    </InformationBox>

                    {/* PaymentOption */}
                    <InformationBox
                      className="paymentBox"
                      style={{ paddingBottom: 30 }}
                    >
                      <Payment
                        orderLoading={orderLoading}
                        setOrderLoading={setOrderLoading}
                        totalAmount={totalAmount}
                        getPaymentOptionValue={handlePaymentOptionValue}
                        loading={loading}
                        formik={props}
                        deviceType={deviceType}
                        increment={true}
                        onPaymentConfirm={handlePaymentConfirm}
                      />
                    </InformationBox>

                    {/* <ChakraBox w="full">
                    <OrderBump />
                  </ChakraBox> */}
                  </CheckoutInformation>

                  <CartWrapper>
                    <Sticky
                      enabled={
                        size.width >= 768 && !isCheckoutCartShow ? true : false
                      }
                      // enabled={false}
                      top={120}
                      innerZ={999}
                    >
                      <OrderInfo>
                        <Title>
                          <FormattedMessage
                            id="cartTitlecheckout"
                            defaultMessage="Παραγγελία"
                          />
                        </Title>

                        <Scrollbar className="checkout-scrollbar">
                          <ItemsWrapper>
                            {cartItemsCount > 0 ? (
                              items.map(item => (
                                <OrderItem
                                  key={`cartItem-${item.id}`}
                                  product={item}
                                />
                              ))
                            ) : (
                              <>
                                <NoProductImg>
                                  <NoCartBag />
                                </NoProductImg>

                                <NoProductMsg>
                                  <FormattedMessage
                                    id="noProductFoundcheckout"
                                    defaultMessage="Δεν βρέθηκε κανένα προϊόν"
                                  />
                                </NoProductMsg>
                              </>
                            )}
                          </ItemsWrapper>
                        </Scrollbar>

                        <CalculationWrapper>
                          <TextWrapper>
                            <Text>
                              <FormattedMessage
                                id="subTotalcheckout"
                                defaultMessage="Υποσύνολο"
                              />
                            </Text>
                            <Text>
                              {CURRENCY}
                              {calculateSubTotalPrice()}
                            </Text>
                          </TextWrapper>

                          {selectedShippingLine === "acs_courier" && (
                            <TextWrapper>
                              <Text>
                                <FormattedMessage
                                  id="intlOrderDetailsDeliverycheckout"
                                  defaultMessage="Κόστος Μεταφορικών"
                                />
                              </Text>
                              <Text>{CURRENCY}3</Text>
                            </TextWrapper>
                          )}

                          {selectedPaymentOptionValue === "pay on delivery" && (
                            <TextWrapper>
                              <Text>
                                <FormattedMessage
                                  id="payOnDelivery"
                                  defaultMessage="Αντικαταβολή"
                                />
                              </Text>
                              <Text>{CURRENCY}2.00</Text>
                            </TextWrapper>
                          )}

                          <TextWrapper style={{ marginTop: 20 }}>
                            <Bold>
                              <FormattedMessage
                                id="totalTextcheckout"
                                defaultMessage="Σύνολο"
                              />{" "}
                              <Small>
                                (
                                <FormattedMessage
                                  id="vatTextcheckout"
                                  defaultMessage="Με ΦΠΑ"
                                />
                                )
                              </Small>
                            </Bold>
                            <Bold>
                              {CURRENCY}
                              {currencyFormatter.format(totalAmount, {})}
                            </Bold>
                          </TextWrapper>
                        </CalculationWrapper>
                      </OrderInfo>
                    </Sticky>
                  </CartWrapper>
                </CheckoutContainer>
              </CheckoutWrapper>
            </chakra.form>
          );
        }}
      </Formik>
    );

  return null;
};

export default CheckoutWithSidebar;
