import React, { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import useUser from "data/use-user";
import { useCart } from "contexts/cart/use-cart";
import { CardHeader } from "components/card-header/card-header";
import {
  CardExpiryElement,
  Elements,
  ElementsConsumer,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardCvcElement, CardNumberElement } from "@stripe/react-stripe-js";
import {
  Alert,
  AlertIcon,
  Button,
  Checkbox,
  Input,
  HStack,
  Box,
  FormControl,
  FormLabel,
  useToast,
  Stack,
  Radio,
  RadioGroup,
  Text as ChakraText,
  Box as ChakraBox,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon,
  SlideFade,
  Slide,
} from "@chakra-ui/react";
import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TermConditionText } from "features/checkouts/checkout-two/checkout-two.style";
import { Formik, FormikProps } from "formik";
import { stripePrimaryKey } from "site-settings/site-credentials";

interface Props {
  deviceType: any;
  increment?: boolean;
  onPaymentConfirm?: any;
  formik: FormikProps<{}>;
  loading?: boolean;
  getPaymentOptionValue: (value) => void;
  totalAmount: string;
  orderLoading: boolean;
  setOrderLoading: Dispatch<SetStateAction<boolean>>;
}

const stripePromise = loadStripe(stripePrimaryKey);

const Payment = ({
  orderLoading,
  setOrderLoading,
  totalAmount,
  getPaymentOptionValue,
  formik,
  increment = false,
  onPaymentConfirm,
}: Props) => {
  const { deletePaymentCard } = useUser();
  const { calculatePrice } = useCart();
  const [paymentOptionValue, setPaymentOptionValue] = useState("bank transfer");
  const [shouldStripeConfirm, setShouldStripeConfirm] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [agreedOnTermsAndCondtions, setAgreedOnTermsAndCondtions] =
    useState(false);

  useEffect(() => {
    getPaymentOptionValue(paymentOptionValue);
  }, [paymentOptionValue]);

  // console.log({ formik });

  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="selectPaymentTextInGreek"
          defaultMessage="???????????? ????????????????"
        />
      </CardHeader>
      <RadioGroup defaultValue="bank transfer">
        <Stack spacing="5">
          <Radio
            onChange={() => setPaymentOptionValue("bank transfer")}
            value="bank transfer"
          >
            ?????????????????? ????????????????
          </Radio>
          {paymentOptionValue === "bank transfer" && (
            <SlideFade in={true}>
              <AppToolTip content="???????? ?????? ?????????????? ?????? ?????????????????? ???????? ?????????????????? ?????? ????????????????????. ?????????????????????? ?????????????????????????? ???? ID ?????? ?????????????????????? ?????? ???? ?????????????????????? ????????????????. ?? ???????????????????? ?????? ???? ???? ?????????????????? ?????????? ???? ?????????? ?? ?????????????????? ????????????????." />
            </SlideFade>
          )}
          <Radio
            onChange={() => setPaymentOptionValue("pay on delivery")}
            value="pay on delivery"
          >
            ????????????????????????
          </Radio>
          {paymentOptionValue === "pay on delivery" && (
            <SlideFade in={true}>
              <AppToolTip content="?????????????? ???? ?????????????? ???????? ?????? ????????????????." />
            </SlideFade>
          )}
          <Radio onChange={() => setPaymentOptionValue("card")} value="card">
            ?????????????? ???? ??????????????????/?????????????????? ??????????
          </Radio>
          {paymentOptionValue === "card" && (
            <SlideFade in={true}>
              <AppToolTip
                // content="Payment via Alpha Bank: Mastercard, Visa, Diners American Express cards of all Banks are accepted"
                content={
                  <Elements stripe={stripePromise}>
                    <ElementsConsumer>
                      {({ stripe, elements }) => (
                        <CheckoutForm
                          loading={orderLoading}
                          setLoading={setOrderLoading}
                          totalAmount={totalAmount}
                          formik={formik}
                          shouldConfirm={shouldStripeConfirm}
                          stripe={stripe}
                          elements={elements}
                          onPaymentConfirm={onPaymentConfirm}
                        />
                      )}
                    </ElementsConsumer>
                  </Elements>
                }
              />
            </SlideFade>
          )}
        </Stack>

        <TermConditionText>
          <Checkbox
            onChange={e =>
              setAgreedOnTermsAndCondtions(e.currentTarget.checked)
            }
          >
            ?????? ???????????????? ?????? ?????????????? ???? ???????? ???????? ?????? ???????????????????????? ?????? ??????????????????{" "}
            <ChakraBox as="span" color="red" fontWeight="bold">
              *
            </ChakraBox>
          </Checkbox>
        </TermConditionText>

        {!formik.isValid && (
          <Alert status="error" mt="6">
            <AlertIcon />
            {formik?.errors["phoneNumber"]
              ? "?? ?????????????? ?????????????????? ???????????? ???? ?????????? 10 ??????????" // "Phone number must be 10 digits"
              : "???? ???????????? ?? ???????? ??????????!"}
          </Alert>
        )}

        {/* <CheckoutSubmit> */}
        <Button
          mt="6"
          bg="#EA870E"
          color="white"
          _hover={{ bg: "#EA870E", color: "white" }}
          w="full"
          isLoading={orderLoading}
          isDisabled={!formik.isValid || !agreedOnTermsAndCondtions}
          onClick={() => {
            if (paymentOptionValue === "card") {
              // console.log("Hey, card is triggered!");
              setShouldStripeConfirm(true);

              setTimeout(() => {
                setShouldStripeConfirm(false);
              }, 3000);
            }

            if (paymentOptionValue === "bank transfer") {
              onPaymentConfirm({
                payment_method: "bacs",
                payment_method_title: "?????????????????? ????????????????",
                paid: false,
              });
              formik.submitForm();
            }

            if (paymentOptionValue === "pay on delivery") {
              onPaymentConfirm({
                payment_method: "cod",
                payment_method_title: "????????????????????????",
                paid: false,
              });
              formik.submitForm();
            }
          }}
        >
          ???????????????? ??????????????????????
        </Button>
        {/* </CheckoutSubmit> */}
      </RadioGroup>
    </>
  );
};

function CheckoutForm({
  loading,
  setLoading,
  totalAmount,
  formik,
  stripe,
  elements,
  shouldConfirm,
  onPaymentConfirm,
}) {
  const toast = useToast();
  const { calculatePrice } = useCart();
  const [cardHolderName, setCardHolderName] = useState("");
  // const [loading, setLoading] = useState(false);

  // console.log({ items, calculatePrice: calculatePrice() });

  useEffect(() => {
    if (shouldConfirm) {
      // console.log({ cardHolderName });
      getAsync();
    }
  }, [shouldConfirm]);

  const getAsync = async () => {
    setLoading(true);

    // handle payment request
    if (!stripe || !elements) {
      return;
    }

    //// With splitted elements ////
    const card = elements.getElement(CardNumberElement);
    const { error, token } = await stripe.createToken(card, {
      name: cardHolderName,
      address_country: "PK",
      currency: "eur",
    });

    // console.log({ error, token });

    if (error) return;

    try {
      const { data } = await axios.post("/api/stripe", {
        token,
        data: { amount: parseFloat(totalAmount) * 100 },
      }); // Example: 30.50 * 100 --> 3050 (because stripe doesnot accept in decimals)
      // console.log({ data });

      // setLoading(false)
      if (data.charges.status === "succeeded") {
        onPaymentConfirm({
          payment_method: "card",
          payment_method_title: "?????????????? ???? ??????????????????/?????????????????? ??????????",
          paid: true,
        });
        formik.submitForm();
      }

      // setLoading(false)
    } catch (error) {
      console.log({ error });
      toast({
        title: "Payment declined!",
        position: "top",
        isClosable: true,
        status: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Box>
      <Stack pb="3">
        <FormControl>
          <FormLabel>?????????? ??????????????</FormLabel>
          <Input
            mt="-2"
            p="2"
            bg="white"
            fontSize="15"
            size="sm"
            rounded="md"
            color="gray.800"
            fontWeight="semibold"
            letterSpacing=".1rem"
            _placeholder={{
              fontSize: "20",
              color: "gray.200",
            }}
            value={cardHolderName}
            _focus={{ outline: "none", borderColor: "transparent" }}
            borderColor={"transparent"}
            onChange={e => setCardHolderName(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>?????????????? ????????????</FormLabel>
          <Input
            mt="-2"
            p="2"
            bg="white"
            fontSize="20"
            size="sm"
            rounded="md"
            _placeholder={{
              fontSize: "20",
            }}
            options={{
              style: {
                base: {
                  letterSpacing: ".1rem",
                },
              },
            }}
            as={CardNumberElement}
          />
        </FormControl>
        <HStack>
          <FormControl flex="1">
            <FormLabel>???????????????????? ??????????</FormLabel>
            <Input
              mt="-2"
              p="2"
              bg="white"
              fontSize="20"
              size="sm"
              rounded="md"
              _placeholder={{
                fontSize: "20",
              }}
              options={{
                style: {
                  base: {
                    letterSpacing: ".1rem",
                  },
                },
              }}
              as={CardExpiryElement}
            />
          </FormControl>
          <FormControl w="20%">
            <FormLabel>CVC</FormLabel>
            <Input
              mt="-2"
              p="2"
              bg="white"
              fontSize="20"
              size="sm"
              rounded="md"
              _placeholder={{
                fontSize: "20",
              }}
              options={{
                style: {
                  base: {
                    letterSpacing: ".1rem",
                  },
                },
              }}
              as={CardCvcElement}
            />
          </FormControl>
        </HStack>
        {/* <Button
          onClick={handleSubmitForm} 
          colorScheme="primary"
          isLoading={loading}
        >Confirm</Button> */}
      </Stack>
    </Box>
  );
}

interface AppToolTipProps {
  content: string | ReactNode;
}
const AppToolTip: FC<AppToolTipProps> = ({ content }) => {
  const color = "#c5eafd";

  return (
    <ChakraBox
      position="relative"
      bg={color}
      rounded="md"
      w="100%"
      h="max"
      p="3"
    >
      <ChakraBox
        transform="rotate(90deg)"
        border="solid 10px transparent"
        borderRightColor={color}
        position="absolute"
        top="-4"
        left="4"
      />
      <ChakraText>{content}</ChakraText>
    </ChakraBox>
  );
};

export default Payment;
