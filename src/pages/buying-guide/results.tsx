import { Box, Button, Container, Flex, Heading, HStack, SimpleGrid, Skeleton, Stack, Tag, Text, toast, useToast, Wrap } from "@chakra-ui/react";
import WooCommerce from "lib/woocommerce";
import { ProductGrid } from "components/product-grid/product-grid";
import React, { useContext, useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import ProductCarousal from "./../../components/ProductCarousal";
import ProductGridLoading from "components/product-grid/product-grid-loading";
import { getProductsByTagId } from "services/products";
const PAGE_TYPE = "grocery";
import _ from 'lodash'
import CloseModalOutsideClick from "utils/closeModalOutsideClick";
import CartPopUp from "features/carts/cart-popup";
import { Modal } from '@redq/reuse-modal';
import axios from "axios";
import { AuthContext } from "contexts/auth/auth.context";
import { frontEndDomain } from "site-settings/site-credentials";
// import { tags } from 'data/tags';

const tags: any = [
  {
    id: "314",
    name: "Ακμή",
    slug: "acne",
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
    children: null,
  },
  {
    id: "318",
    name: "Δυσχρωμίες/ Πανάδες/ Μέλασμα",
    slug: "disxromies",
    children: null,
  },
  {
    id: "319",
    name: "Ρυτίδες",
    slug: "ritides",
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
    children: null,
  },
  {
    id: "324",
    name: "Μάτια",
    slug: "matia",
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
    children: null,
  },
  {
    id: "329",
    name: "Ευαίσθητο Δέρμα/ Ροδόχρους",
    slug: "rodoxrous",
    children: null,
  },
  {
    id: "330",
    name: "Αποκατάσταση Δέρματος/ Ανάπλαση",
    slug: "anaplasi",
    children: null,
  },
  {
    id: "331",
    count: 7,
    name: "Πρωϊ",
    slug: "prwi",
    children: null,
  },
  {
    id: "332",
    count: 0,
    name: "Καθαρισμός",
    slug: "cleansers",
    children: null,
  },
  {
    id: "333",
    count: 2,
    name: "Ενυδάτωση",
    slug: "hydrating",
    children: null,
  },
  {
    id: "334",
    count: 2,
    name: "Αντηλιακά",
    slug: "spf",
    children: null,
  },
  {
    id: "335",
    count: 4,
    name: "Βράδυ",
    slug: "vradi",
    children: null,
  }, 
  {
    id: "336",
    count: 2,
    name: "Extra Προϊόντα",
    slug: "extraproionta",
    children: null,
  },
  {
    id: "337",
    count: 5,
    name: "Καθαρισμός",
    slug: "cleanser",
    children: null,
  }
];

const BuyingGuideResults = ({ prwiProducts: _prwiProducts, vradiProducts: _vradiProducts, extraproiontaProducts: _extraproiontaProducts, deviceType }) => {
  const router = useRouter();
  const [emailLoading, setEmailLoading] = useState(false);
  const toast = useToast();
  const { authState } = useContext<any>(AuthContext)
  const [currCustomer, setCurrCustomer] = useState(null);
  const [emailSuccess, setEmailSuccess] = useState(false);
  
  const [prwiProducts, setPrwiProducts] = useState(_prwiProducts);
  const [vradiProducts, setVradiProducts] = useState(_vradiProducts);
  const [extraproiontaProducts, setExtraproiontaProducts] = useState(_extraproiontaProducts);

  const [selectedTag, setSelectedTag] = useState(null);

  // useEffect(() => {
  //   if (!localStorage.getItem("customer")) {
  //     router.push("/buying-guide");
  //     return;
  //   }

  //   if (!authState.customer) {
  //     setCurrCustomer(JSON.parse(localStorage.getItem("customer")));
  //     return;

  //   } 
  //   setCurrCustomer(authState.customer);
  // }, [authState])

  useEffect(() => {
    if (!router.query.email) {
      router.push("/buying-guide")
      return
    }
  }, [])

  useEffect(() => {
    if (!router.query.parentTag) return;

    getAsyncData();
    async function getAsyncData() {
      const parentTag = tags.find(tag => tag.slug === router.query.parentTag);

      let childTag = null;
      if (!!router.query.childTag) {
        childTag = parentTag?.children.find(tag => tag.slug === router.query.childTag);
      }

      setSelectedTag(childTag ? childTag : parentTag)

      // const products = await getProductsByTagId(childTag ? childTag.id : parentTag.id)
      const products = await getProductsByTagId(childTag ? childTag.id : parentTag.id)
    
      setPrwiProducts([..._prwiProducts, ...products]);
      setVradiProducts([..._vradiProducts, ...products]);
      setExtraproiontaProducts([..._extraproiontaProducts, ...products])
    }
  }, [router.query]);

  const handleSubmit = async () => {
    setEmailLoading(true);

    const { data, status } = await axios.post("/api/sendgrid", {
      customerEmail: router.query.email,
      name: router.query.name,
      html: `
        <p>Αγαπητή/έ ${router.query.name}</p>
        </br>

        <p>Ευχαριστούμε που χρησιμοποιήσατε τον βοηθό αγοράς του All4Skin!</p>
        </br>
        
        <p>Μπορείτε να δείτε τα αποτελέσματα οποιαδήποτε στιγμή.</p>
        <p>Πατήστε παρακάτω για δείτε τα αποτελέσματα στην ιστοσελίδα μας.</p>
        </br>

        <a href="${frontEndDomain}${router.asPath}">Δείτε τα αποτελέσματα σας</a>
        </br>
        </br>

        <p>
        <strong>
          <em>— All4Skin</em>
        </strong>
        </p>
      `
    });
    // console.log({ data, status })
    setEmailLoading(false);

    if (status === 200) {
      setEmailSuccess(true)
      toast({
        title: "Θα βρείτε τα αποτελέσματα και στο email σας",
        status: 'success',
        position: 'top',
        isClosable: true,
      });

      return;
    } 

    toast({
      title: "Παρουσιάστηκε κάποιο σφάλμα",
      status: 'error',
      position: 'top',
      isClosable: true,
    });
  }

  return (
    <Modal>
    <Container maxW="1480px" py={{ base: 20, lg: 40 }} px={{ base: 5, lg: 20 }} minH="90vh">
      <Wrap align="center" justify={{ base: "center", md: "space-between"}} spacing="4" p={5}>
        <Text fontSize={{ base: "xl", lg: "3xl" }}>Αποτελέσματα Βοηθού για: {router.query.name}</Text>
        <HStack spacing="4">
          <Button isDisabled={emailSuccess} isLoading={emailLoading} ml={10} bg="black" color="white" onClick={handleSubmit}>
          {emailSuccess ? 'Απεσταλμένα!' : 'Αποστολή στο email'}
          </Button>
          <Button ml={10} colorScheme="red" onClick={() => router.push("/")}>
          Επαναφορά
          </Button>
        </HStack>
      </Wrap>

      <Stack w="full">
        {/* Prwi */}
        <>
          <Box w="full" p={5} bg="black">
            <Text color="white">{tags.find(tag => tag.slug === "prwi").name}</Text>
          </Box>
          <GuideSubSection 
            deviceType={deviceType} 
            selectedTag={selectedTag}
            childTag={tags.find(tag => tag.slug === "cleanser")}
            products={prwiProducts} 
          />
          <GuideSubSection 
            deviceType={deviceType} 
            selectedTag={selectedTag}
            childTag={tags.find(tag => tag.slug === "hydrating")}
            products={prwiProducts} 
          />
          <GuideSubSection 
            deviceType={deviceType} 
            selectedTag={selectedTag}
            childTag={tags.find(tag => tag.slug === "spf")}
            products={prwiProducts} 
          />
        </>

        {/* Vradi */}
        <>
          <Box w="full" p={5} bg="black">
            <Text color="white">{tags.find(tag => tag.slug === "vradi").name}</Text>
          </Box>
          <GuideSubSection 
            deviceType={deviceType} 
            selectedTag={selectedTag}
            childTag={tags.find(tag => tag.slug === "cleanser")}
            products={vradiProducts} 
          />
          <GuideSubSection 
            deviceType={deviceType} 
            selectedTag={selectedTag}
            childTag={tags.find(tag => tag.slug === "hydrating")}
            products={vradiProducts} 
          />
        </>

        {/* Extraproionta */}
        <>
          <Box w="full" p={5} bg="black">
            <Text color="white">{tags.find(tag => tag.slug === "extraproionta").name}</Text>
          </Box>
          <GuideSubSection 
            showChildHeader={false}
            selectedTag={selectedTag}
            deviceType={deviceType} 
            childTag={tags.find(tag => tag.slug === "extraproionta")}
            products={extraproiontaProducts} 
          />
        </>
      </Stack>
    </Container>

    <CloseModalOutsideClick>
        <CartPopUp deviceType={deviceType} />
      </CloseModalOutsideClick>
    </Modal>
  );
};

interface Props {
  childTag: any
  products: any[]
  deviceType: any
  showChildHeader?: boolean
  selectedTag?: any
}
function GuideSubSection({ childTag, products, deviceType, selectedTag, showChildHeader=true }: Props) {
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
      const filteredProducts = [];

      for (const product of products) {
        for (const tag of product.tags) {
          if (tag.slug === childTag.slug) filteredProducts.push(product)
        }
      }

      if (!selectedTag) {
        setFilteredProducts(filteredProducts)
        return;
      }
      
      const selectedTagProducts = []
      for (const product of products) {
        for (const tag of product.tags) {
          if (tag.slug === selectedTag.slug) selectedTagProducts.push(product)
        }
      }

      // setFilteredProducts([...filteredProducts, ...selectedTagProducts])
      setFilteredProducts(_.unionBy(filteredProducts, selectedTagProducts, 'slug'))

  // }, [router.query])
  }, [products, selectedTag])
  // }, [products])

  // console.log({ filteredProducts })
  
  return (
    <>
      {!!showChildHeader && !!childTag.name && (
        <Box w="full" p={5} bg="gray.100">
          <Text>{childTag.name}</Text>
        </Box>
      )}
      <Box p={{ base: 0, lg: 5 }}>
        <ProductCarousal  
          products={filteredProducts}
        />
        {/* {loading ? <ProductGridLoading /> : <ProductGrid
          // productsData={filteredProducts ? filteredProducts : products}
          productsData={filteredProducts}
          type={PAGE_TYPE}
          deviceType={deviceType}
        />}  */}
      </Box>
    </>
  )
}

export async function getStaticProps(context) {
  const prwiProducts = await getProductsByTagId(tags.find(tag => tag.slug === "prwi").id.toString());
  const vradiProducts = await getProductsByTagId(tags.find(tag => tag.slug === "vradi").id.toString());
  const extraproiontaProducts = await getProductsByTagId(tags.find(tag => tag.slug === "extraproionta").id.toString());

  return {
    props: {
      prwiProducts: prwiProducts || [],
      vradiProducts: vradiProducts || [],
      extraproiontaProducts: extraproiontaProducts || []
    }, // will be passed to the page component as props
    revalidate: 10
  }
}

export default BuyingGuideResults;




// LEGACY CODE
{/* <ProductCarousal
  products={filteredProducts ? filteredProducts : products}
  /> */}