///////////////////////
/**
  1- USED IN PRODUCTS IN HOMEPAGE
  2- USED IN RELATED PRODUCTS IN PRODUCT PAGE
 **/
//////////////////////

import React from "react";
import Link from "next/link";
import { AddItemToCart } from "components/add-item-to-cart";
import styled from "styled-components";
import css from "@styled-system/css";
import { Box } from "components/box";
import { useState } from "react";
import { useEffect } from "react";
import getDiscountPercent from "utils/getDiscountPercent";
import NextImage from "next/image";
import { Text } from "@chakra-ui/react";

const Card = styled.div({
  backgroundColor: "#fff",
  overflow: "hidden",
  borderRadius: 6,
  border: "1px solid #f3f3f3",
  display: "flex",
  flexDirection: "column",
  transition: "0.3s ease-in-out",
  cursor: "pointer",
  maxWidth: "20rem",

  ":hover": {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    transform: "translateY(-5px)",
  },
});
const ImageWrapper = styled.div({
  // height: 290,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  overflow: "hidden",
  height: 270,

  "@media screen and (max-width: 1280px)": {
    height: 250,
  },

  "@media screen and (max-width: 560px)": {
    height: 180,
  },
});

const Image = styled.img({
  maxWidth: "100%",
  maxHeight: "100%",
  height: "auto",
});
const Discount = styled.div(
  css({
    position: "absolute",
    top: "1rem",
    right: "1rem",
    backgroundColor: "primary.regular",
    color: "#fff",
    overflow: "hidden",
    padding: "0.25rem 0.5rem",
    fontSize: 12,
    borderRadius: 6,
    pointerEvents: "none",
  })
);
const Title = styled.h2({
  marginBottom: 10,
  color: "#999",
  fontSize: 14,
  fontWeight: "normal",
});

const PriceWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: 10,
});

const Price = styled.span(
  css({
    color: "text.bold",
    fontSize: 18,
    fontWeight: "semiBold",
    lineHeight: 1,
  })
);

const SalePrice = styled.span(
  css({
    color: "text.regular",
    fontSize: 15,
    lineHeight: 1,
    fontWeight: "regular",
    padding: "0 5px",
    overflow: "hidden",
    position: "relative",
    marginLeft: 10,
    display: "flex",
    alignItems: "center",

    ":before": {
      content: '""',
      width: "100%",
      height: 1,
      display: "inline-block",
      backgroundColor: "text.regular",
      position: "absolute",
      top: "50%",
      left: 0,
    },
  })
);

interface Props {
  data?: any;
  deviceType: any;
  style?: any;
}

export const ProductCard = ({ style, data, deviceType }: Props) => {
  const [categorySlug, setCategorySlug] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [discountInPercent, setDiscountInPercent] = useState(null);

  useEffect(() => {
    if (!data?.permalink) return;

    const splitted = data.permalink.split("/");

    setCategorySlug(splitted[3]);
    setProductSlug(splitted[4]);

    if (!data?.sale_price) return;
    const discountInPercent = data.sale_price
      ? getDiscountPercent(data.regular_price, data.sale_price)
      : undefined;
    setDiscountInPercent(discountInPercent);
  }, []);

  if (!categorySlug || !productSlug) return null;

  // IF product don't have any image, then don't show it

  if (data?.images.length === 0) return null;

  // return <h1>Dev</h1>

  return (
    <Card style={style}>
      <Link href="/[category]/[product]" as={`/${categorySlug}/${productSlug}`}>
        <a>
          <Box>
            <Box>
              <ImageWrapper>
                {/* <Image src={data?.images?.[0]?.src} alt={data?.name} /> */}
                <NextImage
                  src={encodeURI(data?.images?.[0]?.src)}
                  layout="fill"
                  objectFit="cover"
                />
                {discountInPercent ? (
                  <Discount>{discountInPercent}%</Discount>
                ) : null}
              </ImageWrapper>
              <Box px={20} py="2">
                <PriceWrapper>
                  <Price>
                    {data.sale_price ? data.sale_price : data.regular_price}{" "}
                    &euro;
                  </Price>
                  {discountInPercent ? (
                    <SalePrice>{data.regular_price}</SalePrice>
                  ) : null}
                </PriceWrapper>
                {/* <Title>{data.name}</Title> */}
                <Text fontSize="14" noOfLines={2} h="3.3rem" color="#0D1136">
                  {data.name}
                </Text>
              </Box>
            </Box>
          </Box>
        </a>
      </Link>
      <Box mt="2" px={20} pb={20}>
        <AddItemToCart
          deviceType={deviceType}
          data={data}
          variant="full"
          buttonText="Προσθήκη στο καλάθι"
        />
      </Box>
    </Card>
  );
};
