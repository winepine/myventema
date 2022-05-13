import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { ArrowNext } from "assets/icons/ArrowNext";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import { useLocale } from "contexts/language/language.provider";
import axios from "axios";
import { useBreakpointValue, Wrap as ChakraWrap } from "@chakra-ui/react";
import { Heading, Box } from "@chakra-ui/react";
import { ProductCard } from "components/product-card/product-card-seven";
import { FormattedMessage } from "react-intl";

const ButtonPrev = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  color: ${themeGet("colors.primary.regular", "#e35453")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet("colors.primary.regular", "#e35453")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonGroupWrapper = styled("div")``;

const PrevButton = ({ onClick, children }: any) => {
  return (
    <ButtonPrev
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      className="prevButton"
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }: any) => {
  return (
    <ButtonNext
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      className="nextButton"
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous }: any) => {
  const { isRtl }: any = useLocale();

  return (
    <ButtonGroupWrapper>
      {isRtl ? (
        <>
          <NextButton onClick={() => next()} className="rtl">
            <ArrowPrev />
          </NextButton>
          <PrevButton onClick={() => previous()}>
            <ArrowNext />
          </PrevButton>
        </>
      ) : (
        <>
          <PrevButton onClick={() => previous()}>
            <ArrowPrev />
          </PrevButton>
          <NextButton onClick={() => next()}>
            <ArrowNext />
          </NextButton>
        </>
      )}

      {/* if prop isRtl true swap prev and next btn */}
    </ButtonGroupWrapper>
  );
};

type Props = {
  data: any[] | undefined;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  isRtl?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  itemClass?: string;
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 780 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 780, min: 420 },
    items: 2,
  },
  smallMobile: {
    breakpoint: { max: 420, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  data,
  deviceType,
  component,
  autoPlay = false,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  itemClass,
  isRtl,
  ...props
}: Props) {
  const screenSize = useBreakpointValue({ base: "mobile", md: "desktop" })

  return (
    <Box p="3" dir="ltr">
      {/* <Heading fontSize="22" pb="6" pt="2">
        <FormattedMessage
          id="ProductPage.RelatedProducts"
          defaultMessage="Αποτελέσματα"
        />
      </Heading> */}
      <Carousel
        arrows={false}
        responsive={responsive}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass="container-with-dots"
        itemClass={itemClass}
        autoPlay={autoPlay}
        autoPlaySpeed={3000}
        renderButtonGroupOutside={true}
        additionalTransfrom={0}
        customButtonGroup={((screenSize === "mobile" && data.length > 1) || (screenSize === "desktop" && data.length > 4)) && <ButtonGroup />}
        {...props}
        // use dir ltr when rtl true
      >
        {data.map(product => (
          <Box
            key={product.id}
            style={{ padding: "0 10px", overflow: "hidden" }}
          >
            <ProductCard
              //   productsDataType="restapi"
              deviceType={deviceType}
              data={product}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}
