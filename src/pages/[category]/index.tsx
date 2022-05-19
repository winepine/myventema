import React, { useEffect, useState } from "react";
import ChakraLoading from "components/common/ChakraLoading";
import ChildCategory from "components/Pages/ChildCategory";
import WooCommerce from "lib/woocommerce";
import { useRouter } from "next/router";
import _ from "lodash";
import { NextSeo } from "next-seo";
import { getCategoryPageData } from "services/categoryPage";
import { getAllWCCategories } from "services/categories";
import { getExtractedAttributes } from "utils/getExtractedAttributes";
import useSWR from "swr";
import axios from "axios";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";

const Category = ({
  dbProducts,
  count,
  subCategories,
  category,
  deviceType,
}) => {
  const productDB = JSON.parse(dbProducts);
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const yoast = category?.meta?.yoast_head_json;
  const [filteredProducts, setFilteredProducts] = useState(undefined);
  const [products, setProducts] = useState(productDB.slice(0, 36));
  const [attributes, setAttributes] = useState([]);
  // const [count, setCount] = useState(_count)

  useEffect(() => {
    async function getAsyncData() {
      const { attributes } = await getExtractedAttributes({
        products: productDB,
      });
      setAttributes(attributes);
    }
    getAsyncData();
  }, []);

  useEffect(() => {
    async function getAsyncData() {
      const { category: categorySlug1, ...rest } = router.query;

      // if (Object.keys(rest).length === 0) {
      //   setProducts(productDB.slice(0, 36))
      //   return;
      // };

      const orderby = router?.query?.orderby || "date";
      const order = router?.query?.order || undefined;
      const attribute = router?.query?.attribute || undefined;
      const attribute_term = router?.query?.attributeTerm || undefined;
      const page = router?.query?.page || 1;

      setProductsLoading(true);
      // const { data: products } = await WooCommerce.get(`products`, { category: category.meta.id, per_page: 36, page, orderby, order, attribute, attribute_term });
      const { data: products } =
        await axios.get(`${siteURL}/wp-json/wc/v3/products?per_page=36&orderby=${orderby}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&category=${
          category?.meta?.id || ""
        }&page=${page}
      `);
      setProducts(products);
      setProductsLoading(false);
    }
    getAsyncData();
  }, [router.query]);

  if (router.isFallback) return <ChakraLoading />;
  return (
    <>
      <NextSeo
        title={yoast?.title || ""}
        canonical={yoast?.canonical}
        openGraph={{
          title: `${yoast?.og_title}` || "",
          description: "",
          type: yoast?.og_type || "",
          url: yoast?.og_url || "",
          locale: yoast?.og_locale || "",
          site_name: yoast?.og_site_name || "",
        }}
        twitter={{
          cardType: yoast?.twitter_card,
        }}
        robotsProps={{
          maxImagePreview: yoast?.robots["max-image-preview"].split(":")?.[1],
          maxSnippet: parseInt(yoast?.robots["max-snippet"]?.split(":")?.[1]),
          maxVideoPreview: parseInt(
            yoast?.robots["max-video-preview"]?.split(":")?.[1]
          ),
        }}
      />
      <ChildCategory
        deviceType={deviceType}
        categories={parentCategories}
        productsData={filteredProducts ? filteredProducts : products}
        productsDataType="restapi"
        count={count}
        subCategories={subCategories}
        categoryName={category?.name}
        categoryDescription={category?.description}
        productsLoading={productsLoading}
        attributes={attributes?.length > 0 ? attributes : []}
      />
    </>
  );
};

export async function getServerSideProps({ params, query }) {
  try {
    const { document: category, error } = await getCategoryPageData(
      "categories",
      { "category.slug": params.category }
    );

    return {
      props: {
        count: category?.category?.count ?? 0,
        subCategories: category?.subCategories || [],
        category: {
          name: category?.category?.name,
          description: category?.category?.description,
          meta: { ...category?.category },
        },
        dbProducts: JSON.stringify(category?.products || []),
      },
    };
  } catch (error) {
    console.log("/[category] :: ", { params, error });
    return {
      notFound: true,
    };
  }
}

// export async function getStaticPaths() {
//   const categories = await getAllWCCategories();
//   const slugs = categories.map(category => ({ params: { category: category.slug } }));

//   return {
//     paths: slugs,
//     fallback: true // See the "fallback" section below
//   };
// }

export default Category;

// const orderby = query.orderby || "popularity";
//   const order = query.order || undefined;
//   const attribute = query.attribute || undefined;
//   const attribute_term = query.attributeTerm || undefined;

//   try {
//     const { data: categories } = await WooCommerce_v2.get(`products/categories/?slug=${encodeURI(params.category)}`);
//     const { data: products } = await WooCommerce.get(`products`, { category: categories[0]?.id, per_page: 36, orderby, order, attribute, attribute_term });
//     const { data: subCategories } = await WooCommerce.get(`products/categories/?parent=${categories[0]?.id}`);

//     const { document: category, error } = await getSingleDocument("categories", { "category.slug": params.category });
//     const dbProducts = category?.products || [];

//     const { attributes } = await getExtractedAttributes({ products: dbProducts });

//     return {
//       props: {
//         products: products || [],
//         count: categories?.[0]?.count ?? 0,
//         subCategories: subCategories || [],
//         category: {
//           name: categories?.[0]?.name,
//           description: categories?.[0]?.description,
//           meta: {...categories?.[0]}
//         },
//         dbProducts: JSON.stringify(category?.products || []),
//         attributes: attributes || [],
//         mongoCategory: JSON.stringify(category)
//       },
//     }
//   } catch (error) {
//     console.log("/[category] :: ", { error })
//     return {
//       notFound: true
//     }
//   }
