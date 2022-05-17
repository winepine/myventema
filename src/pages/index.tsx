import React, { useEffect, useRef } from "react";
import { ProductGrid } from "components/product-grid/product-grid-three";
import { Modal } from "@redq/reuse-modal";
import dynamic from "next/dynamic";
import styled from "styled-components";
import css from "@styled-system/css";
import { SidebarWithCardMenu } from "layouts/sidebar/sidebar-with-card-menu";
import CloseModalOutsideClick from "../utils/closeModalOutsideClick";
import { Box, Image } from "@chakra-ui/react";
import _ from "lodash";
import Woocommerce from "../lib/woocommerce";
import axios from "axios";
const BuyingGuide = dynamic(() => import("components/buying-guide"), {
  ssr: false,
});
const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});

const PAGE_TYPE = "grocery";
import { NextSeo } from "next-seo";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";
import Carousel from "react-multi-carousel";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 780 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 780, min: 420 },
    items: 1,
  },
  smallMobile: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
  },
};
export default function GroceryTwoPage({ categories, products, deviceType }) {
  const productsRef = useRef(null);

  // useEffect(() => {
  //   getAsyncData();
  //   async function getAsyncData() {
  //     const { data } = await axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, { username: "devioand.aj@gmail.com", password: "asad@1234" });
  //     console.log({ data });
  //   }
  // }, [])

  console.log({ products });

  return (
    <>
      <NextSeo title="Καλλυντικά προσώπου και σώματος - MyVentema" />
      <Modal>
        <ContentArea>
          <SidebarWithCardMenu categories={categories} type={PAGE_TYPE} />
          <main>
            {/* <Box w="full" h="max" position="relative" mb="6">
              <BuyingGuide />
            </Box> */}
            <Carousel swipeable={true} infinite={true} responsive={responsive}>
              <Image src="https://www.myventema.gr/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fgrocery-banner-img-two-658e1c2d65126ebc7981281be152d144.jpg&w=2048&q=75" />
              <Image src="https://www.myventema.gr/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fgrocery-banner-img-one-f183d80d2b3224c2a13e2e340a781be7.jpg&w=2048&q=75" />
            </Carousel>
            {/* just for useRef */}
            <Box ref={productsRef} />
            <ProductGrid
              productsData={products}
              type={PAGE_TYPE}
              deviceType={deviceType}
            />
          </main>
        </ContentArea>
        <CloseModalOutsideClick>
          <CartPopUp deviceType={deviceType} />
        </CloseModalOutsideClick>
      </Modal>
    </>
  );
}

const ContentArea = styled.div<any>(
  css({
    overflow: "hidden",
    padding: ["68px 0 100px", "68px 0 50px", "110px 2rem 50px"],
    display: "grid",
    minHeight: "100vh",
    gridColumnGap: "30px",
    gridRowGap: ["15px", "20px", "0"],
    gridTemplateColumns: [
      "minmax(0, 1fr)",
      "minmax(0, 1fr)",
      "300px minmax(0, 1fr)",
    ],
    backgroundColor: "#f9f9f9",
  })
);

export async function getStaticProps() {
  // const { data: categories } = await Woocommerce.get("products/categories", { parent: 0, per_page: 20 });
  // const { data: products } = await Woocommerce.get("products", { per_page: 30, orderby: "date" });
  const { data: categories } = await axios.get(
    `${siteURL}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&parent=0&per_page=20`
  );
  const { data: products } = await axios.get(
    `${siteURL}/wp-json/wc/v3/products?per_page=30&orderby=popularity&order=desc&featured=true&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
  );

  const filteredCategories = categories.filter(
    category => category.name !== "Uncategorized"
  );
  const sortedMenuItems = filteredCategories.sort(
    (a, b) => a.menu_order - b.menu_order
  );

  return {
    props: {
      categories: sortedMenuItems || [],
      products: products || [],
    },
    revalidate: 60,
  };
}
