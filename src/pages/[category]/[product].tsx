import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Modal } from "@redq/reuse-modal";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "assets/styles/product-single.style";
import { getAllProducts, getProductBySlug } from "utils/api/product";
import { useRouter } from "next/router";
import CloseModalOutsideClick from "../../utils/closeModalOutsideClick";
const ProductDetails = dynamic(
  import("components/product-details/product-details-four/product-details-four")
);
const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});
import WooCommerce from "lib/woocommerce";
import ChakraLoading from "components/common/ChakraLoading";

import { NextSeo, ProductJsonLd } from "next-seo";
import axios from "axios";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";

interface Props {
  product?: any;
  deviceType: any;
}

const ProductDetailsPage = ({ product, deviceType }: Props) => {
  const router = useRouter();
  const yoast = product?.yoast_head_json;

  if (router.isFallback) return <ChakraLoading />;
  let content = <ProductDetails product={product} deviceType={deviceType} />; // Main Focus

  useEffect(() => {
    async function getAsyncData() {
      // const { data: categories } = await WooCommerce.get("products/categories", { per_page: 100, parent: 0 });
      // const menuOrders = categories.map(product => ({ menu_order: product.menu_order }))
      // const sortedMenuItems = categories.sort(
      //   (a, b) => a.menu_order - b.menu_order
      // );
      // const items = sortedMenuItems.filter(item => item.name);
      // console.log({ categories, sortedMenuItems, items });
    }
    getAsyncData();
  }, []);

  // console.log({ product, json: {
  //   productName: product.name,
  //   images: product.images.map(pro => pro.src)
  // } })

  // console.log({ yoast });

  return (
    <>
      <NextSeo
        title={yoast?.title || ""}
        canonical={yoast?.canonical}
        openGraph={{
          title: `${yoast?.og_title} - ${yoast?.og_site_name}` || "",
          description: "",
          type: yoast?.og_type || "",
          url: yoast?.og_url || "",
          locale: yoast?.og_locale || "",
          site_name: yoast?.og_site_name || "",
          images: yoast?.og_image,
          article: {
            modifiedTime: yoast?.article_modified_time,
          },
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
      <ProductJsonLd
        productName={product?.name}
        images={product?.images.map(pro => pro.src)}
        description={product?.short_description}
        releaseDate={product?.date_created}
        offers={[
          {
            price: product?.price,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            seller: { name: "All4Skin" },
          },
        ]}
      />

      <Modal>
        <ProductSingleWrapper>
          <ProductSingleContainer>
            {content}
            <CloseModalOutsideClick>
              <CartPopUp deviceType={deviceType} />
            </CloseModalOutsideClick>
          </ProductSingleContainer>
        </ProductSingleWrapper>
      </Modal>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    // const { data } = await WooCommerce.get(
    //   `products/?slug=${encodeURI(params.product)}`
    // );
    const { data } = await axios.get(
      `${siteURL}/wp-json/wc/v3/products?slug=${encodeURI(
        params.product
      )}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
    );

    // console.log({ params, data });
    if (data.length === 0) throw new Error("Product not found!");

    return {
      props: {
        product: data[0] || [],
      }, // will be passed to the page component as props
    };
  } catch (error) {
    console.log("/[category]/[product] :: ", { error });
    return {
      notFound: true,
    };
  }
}

export default ProductDetailsPage;
