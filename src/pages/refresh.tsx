import { Box, Container, Heading, Stack, Text } from '@chakra-ui/layout';
import { GetServerSideProps, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import { getDataFromCollection, insertDataIntoCollection } from 'services/mongodb';
import { getAllWCProducts } from 'services/products';
import { getAllWCTags } from 'services/tags';
import _ from 'lodash';
import { getAllWCCategories } from 'services/categories';
import axios from 'axios';
import Loader from 'components/loader/loader';


const RefreshPage = ({ 
  // products,
  productsError,
  // tags,
  tagsError,
  // categories,
  categoriesError,
  lastUpdate
}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function getAsyncData() {
  //     setLoading(true)

  //     try {
  //       const { data } = await axios.get("/api/insertProducts");
  //       console.log({ data });
  
  
  //       setProducts(data.products);
  //       // setCategories(data.categories);
  //       // setTags(data.tags);
  //       setLoading(false)
  //     } catch (error) {
  //       setLoading(false)
  //       console.log('/refresh page :: ', { error });
  //     }
  //   }
  //   getAsyncData()
  // }, [])

  useEffect(() => {
    async function getAsyncData() {
      setLoading(true)

      try {
        const { data: { products } } = await axios.get("/api/insertProducts");
        console.log({ products });
        setProducts(products);

        const { data: categoriesData } = await axios.get("/api/insertCategories");
        console.log({ categoriesData });
        
        const { data: { tags } } = await axios.get("/api/insertTags");
        console.log({ tags });
        setTags(tags);
  
        // setCategories(data.categories);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log('/refresh page :: ', { error });
      }
    }
    getAsyncData()
  }, [])



  if (loading) return <Container py="24" centerContent>
    <Loader />
  </Container>

  return (
    <Box py="24">
      <Container centerContent py="6">
        <Stack spacing="5">
          <Stack align="center">
            {/* <Text py="2">Last Update: {JSON.parse(lastUpdate)}</Text> */}
            <Heading fontSize="18">Products</Heading>
            <Text fontSize="18" fontStyle="italic">{productsError ? 'No product created! ❌' : `(${products.length}) products created successfully ✅`}</Text>
          </Stack>
          <Stack align="center">
            <Heading fontSize="18">Tags</Heading>
            <Text fontSize="18" fontStyle="italic">{tagsError ? 'No product created! ❌' : `(${tags.length}) tags created successfully ✅`}</Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await getAllWCProducts();
//   const tagsData = await getAllWCTags();
//   const categoriesWC = await getAllWCCategories();

//   const { data: products, error: productsError } = await insertDataIntoCollection(data, "products");
//   const { data: tags, error: tagsError } = await insertDataIntoCollection(tagsData, "tags");

//   // Inserting categories with products in DB
//   const filteredCategoriesWithProducts = getProductByCategory({ products, categories: categoriesWC });
//   const { data: categories, error: categoriesError } = await insertDataIntoCollection(filteredCategoriesWithProducts, "categories");

//   const date = new Date();
//   const lastUpdate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  
//   return {
//     props: {
//       products: JSON.stringify(products) || [],
//       productsError: productsError || "",
//       tags: JSON.stringify(tags) || [],
//       tagsError: tagsError || "",
//       categories: JSON.stringify(categories) || [],
//       categoriesError: categoriesError || "",
//       lastUpdate: JSON.stringify(lastUpdate)
//     },
//   }
// }

function getProductByCategory({ products, categories }) {
  const filteredCategoriesWithProducts = categories.map(category => {
    const filteredProducts = _.filter(products, (product) => {
      const categories = product.categories;
      return _.some(categories, { id: category.id });
    });

    const subCategories = categories.filter(cat => cat.parent === category.id);
    // console.log({ category, subCategories });

    return { category, subCategories, products: filteredProducts }
  });

  return filteredCategoriesWithProducts;
}

export default RefreshPage;
