import {
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Heading,
  Text,
  Flex,
  Container,
  Stack,
  toast,
  useToast,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BuyingGuideIcon from "components/buying-guide/index";
import React, { useContext, useEffect, useState } from "react";
import { createCustomer, fetchCustomerByEmail, loginCustomer } from "services/customer";
import { HiCursorClick } from "react-icons/hi";
import WooCommerce from "lib/woocommerce";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { AuthContext } from "contexts/auth/auth.context";
// import Logo from '/assets/buying-guide/ακμή.png'
import ImageT from 'assets/buying-guide/ακμή.png'
import NextImage from 'next/image'

const tags = [
  {
    id: "314",
    name: "Ακμή",
    slug: "acne",
    imgSrc: "/assets/buying-guide/ακμή.png",
    children: [
      { id: "315", name: "Φαγεσωρική Ακμή", slug: "fagesoriki", children: null },
      {
        id: "316",
        name: "Φλεγμονική Ακμή",
        slug: "flegmoniki",
        children: null,
      },
    ],
  },
  {
    id: "317",
    name: "Λιπαρότητα/ Διεσταλμένοι Πόροι",
    slug: "liparotita",
    imgSrc: "/assets/buying-guide/Λιπαρότητα_Διεσταλμένοι Πόροι.png",
    children: null,
  },
  {
    id: "318",
    name: "Δυσχρωμίες/ Πανάδες/ Μέλασμα",
    slug: "disxromies",
    imgSrc: "/assets/buying-guide/Δυσχρωμίες_Πανάδες_Μέλασμα.png",
    children: null,
  },
  {
    id: "319",
    name: "Ρυτίδες",
    slug: "ritides",
    imgSrc: "/assets/buying-guide/Ρυτίδες.png",
    children: [
      {
        id: "320",
        name: "Αντιγήρανση/Πρόληψη",
        slug: "antigiransi",
        children: null,
      },
      {
        id: "321",
        name: "Λαιμός/ Ντεκολτέ",
        slug: "laimos",
        children: null,
      },
      {
        id: "322",
        name: "Σύσφιξη",
        slug: "sisfixi",
        children: null,
      },
    ],
  },
  {
    id: "323",
    name: "Θαμπή Όψη",
    slug: "thabiopsi",
    imgSrc: "/assets/buying-guide/Θαμπή Όψη.png",
    children: null,
  },
  {
    id: "324",
    name: "Μάτια",
    slug: "matia",
    imgSrc: "/assets/buying-guide/Μάτια.png",
    children: [
      {
        id: "325",
        name: "Σακούλες",
        slug: "sakoules",
        children: null,
      },
      {
        id: "326",
        name: "Ρυτίδες",
        slug: "ritidesmatiwn",
        children: null,
      },
      { id: "327",  name: "Μαύροι Κύκλοι", slug: "mavroikikloi", children: null },
    ],
  },
  {
    id: "328",
    name: "Ξηρότητα",
    slug: "xirotita",
    imgSrc: "/assets/buying-guide/Ξηρότητα.png",
    children: null,
  },
  {
    id: "329",
    name: "Ευαίσθητο Δέρμα/ Ροδόχρους",
    slug: "rodoxrous",
    imgSrc: "/assets/buying-guide/Ευαίσθητο Δέρμα_Ροδόχρους.png",
    children: null,
  },
  {
    id: "330",
    name: "Αποκατάσταση Δέρματος/ Ανάπλαση",
    slug: "anaplasi",
    imgSrc: "/assets/buying-guide/Αποκατάσταση Δέρματος_Ανάπλαση.png",
    children: null,
  },
];
const BuyingGuide = () => {
  const [currentTags, setCurrentTags] = useState([]);
  const [renderRegister, setRenderRegister] = useState<boolean>();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const Router = useRouter();
  const [currTag, setCurrTag] = useState<any>({});
  const { authState } = useContext<any>(AuthContext);
  const [isCustomerAgree, setIsCustomerAgree] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setCurrentTags(tags);
    setRenderRegister(false);
    const { query } = Router;

    if (query.childTag) {
      const tag = tags.find(tag => tag.slug === query.childTag);
      if (!tag?.children) {
        if (authState.isAuthenticated) {
          Router.push({
            pathname: "/buying-guide/results",
            query: { ...Router.query, name: `${authState.customer.first_name} ${authState.customer.last_name}` },
          }) 
          return;
        } 
        setRenderRegister(true);
      }
      setCurrentTags(tag?.children);
      // setCurrTag(tag)
      return;
    }
    if (query.parentTag) {
      const tag = tags.find(tag => tag.slug === query.parentTag);
      if (!tag?.children) {
        if (authState.isAuthenticated) {
          Router.push({
            pathname: "/buying-guide/results",
            query: { ...Router.query, name: `${authState.customer.first_name} ${authState.customer.last_name}` },
          }) 
          return;
        } 
        setRenderRegister(true);
      }
      setCurrentTags(tag?.children);
      setCurrTag(tag)

      return;
    }

    setCurrTag({})

  }, [Router.query, renderRegister]);

  // --------
  // Tag Click Function
  const tagClick = (e, tag) => {
    const { query } = Router;
    const { parentTag } = query;
    if (!parentTag) {
      Router.push(`/buying-guide?parentTag=${tag.slug}`);
    } else {
      Router.push({
        pathname: `/buying-guide`,
        query: { ...query, childTag: tag.slug },
      });
    }
    return;
  };
  const formSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1],
    };
    const { customer, error, errorStatus } = await createCustomer(data);
    setLoading(false);

    // console.log({ customer, error, errorStatus, email })

    if (!!error && errorStatus === 400) {
      Router.push({
        pathname: `/buying-guide/results`,
        query: { ...Router.query, name, email },
      });

      return;
    }

    localStorage.setItem('customer', JSON.stringify(customer));
      Router.push({
        pathname: `/buying-guide/results`,
        query: { ...Router.query, name, email },
    });
  };
  if (renderRegister) {
    return (
      <Container minH="95vh" maxW="container.sm">
        <Flex
          // w={{ base: "100%", lg: "50%" }}
          // bg="whiteAlpha.600"
          textAlign="center"
          // ml={{ base: "0", lg: "25%" }}
          flexDirection="column"
          alignItems="center"
          pt={{ base: 20, lg: 40 }}
          pb={{ base: 10, lg: 20 }}
          px={10}
        >
          <Heading pb={5}>Βοηθός Αγοράς</Heading>
          <Text>
          Προσθέστε το όνομα σας για να δείτε τα αποτελέσματα του βοηθού αγοράς
          </Text>
          <chakra.form w="full" onSubmit={formSubmit}>
            <Stack spacing={10} w="full">
              <Stack w="full" spacing={6}>
                <FormControl pt={15}>
                  <FormLabel>Ονοματεπώνυμο</FormLabel>
                  <Input
                    required
                    bg="white"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                    id="name"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Τηλέφωνο</FormLabel>
                  <Input
                    required
                    onChange={({ target }) => setPhone(target.value)}
                    bg="white"
                    value={phone}
                    id="phone"
                    type="tel"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Διεύθυνση email</FormLabel>
                  <Input
                    required
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
                    bg="white"
                    id="email"
                    type="email"
                  />
                </FormControl>

                <Checkbox defaultChecked={isCustomerAgree} onChange={(e) => setIsCustomerAgree(e.target.checked )}>Έχω διαβάσει και συμφωνώ με τους όρους χρήσης και προϋποθέσεις του ιστότοπου</Checkbox>

                {/* <FormHelperText py={5}>
              We'll never share your email.
            </FormHelperText> */}
              </Stack>
              <Button
                isDisabled={!isCustomerAgree}
                // isLoading={true}
                isLoading={isLoading}
                // onClick={formSubmit}
                // w="50%"
                w="full"
                colorScheme="pink"
                type="submit"
              >
                Δείτε τα αποτελέσματα
              </Button>
            </Stack>
          </chakra.form>
        </Flex>
      </Container>
    );
  }
  // JSX Returned By This Page

  return (
    <Container maxW="container.sm" minH="90vh">
      <Flex
        flexDirection="column"
        pt={{ base: 20, lg: 40 }}
        px={{ base: 5, lg: 20 }}
        alignItems="center"
        pb={5}
      >
        <Heading py={5} textAlign="center">
          {/* {Router.query.parentTag ? Router.query.parentTag : "ετικέτα"} */}
          {currTag?.name || "Επιλέξτε μια κατηγορία"}
        </Heading>
        {currentTags &&
          currentTags.map((t, i) => (
            <Button
              m={2}
              h={110}
              w={{ base: "100%", lg: "50vw" }}
              bg="gray.200"
              onClick={e => tagClick(e, t)}
              key={i}
            >
              <Flex flexDirection="column" alignItems="center">
                {t?.imgSrc && <img width="50" height="50" src={t.imgSrc} />}
                <Box>
                  <Text mt={3} fontSize={{ base: "small", lg: "large" }}>
                    {t.name}
                  </Text>
                </Box>
              </Flex>
            </Button>
          ))}
      </Flex>
    </Container>
  );
};
export default BuyingGuide;


// LEGACY CODE
// const { customer, error } = await fetchCustomerByEmail(email);
    
    // if (!customer && !!error) {
    //   toast({
    //     title: "Παρουσιάστηκε κάποιο σφάλμα…",
    //     status: 'error',
    //     position: 'top',
    //     isClosable: true,
    //   });

    //   return;
    // }

    // localStorage.setItem('customer', JSON.stringify(customer));