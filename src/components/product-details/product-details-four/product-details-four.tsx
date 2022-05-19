/////////////////
// 1- Being used in product detail page
////////////////

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "components/button/button";
import { openModal, closeModal } from "@redq/reuse-modal";
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaTitle,
  MetaSingle,
  MetaItem,
  RelatedItems,
} from "./product-details-four.style";
import { CartIcon } from "assets/icons/CartIcon";
import ReadMore from "components/truncate/truncate";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { CURRENCY } from "utils/constant";
import { FormattedMessage } from "react-intl";
import { useLocale } from "contexts/language/language.provider";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { ProductGrid } from "components/product-grid/product-grid";
import Cart from "features/carts/cart";
import { ImageGallery } from "components/image-gallery";
import {
  Box,
  Text,
  Wrap,
  Heading,
  Divider,
  HStack,
  Stack,
  Container,
  Flex,
  Square,
  Image,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRef } from "react";
import getDiscountPercent from "utils/getDiscountPercent";
import WooCommerce from "lib/woocommerce";
import BumpCard from "components/common/OrderBump/Card";
import { useQuery } from "react-query";
import axios from "axios";
import {
  consumerKey,
  consumerSecret,
  siteURL,
} from "site-settings/site-credentials";

type ProductDetailsProps = {
  product?: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
}) => {
  const { isRtl } = useLocale();
  const { addItem, removeItem, isInCart, getItem, toggleCart } = useCart();
  const [isDescTruncated, setIsDescTruncated] = useState(true);
  const parentRef = useRef(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const data = product;

  // Fetching upsells products
  const {
    isLoading,
    error,
    data: upsellsProducts,
  } = useQuery(
    "upsellsProducts",
    async () => {
      // const products = await Promise.all(product.related_ids.map(async (id) => {
      const products = await Promise.all(
        [174, 136, 186].map(async id => {
          // const { data: product } = await WooCommerce.get(`products/${id}`);
          const { data: product } = await axios.get(
            `${siteURL}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
          );

          return product;
        })
      );

      return products;
    },
    { initialData: [] }
  );

  // console.log({ isLoading, error, upsellsProducts })

  const handleAddClick = e => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = e => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);

    getRelatedProducts();
  }, []);

  async function getRelatedProducts() {
    const products = await Promise.all(
      product.related_ids.map(async id => {
        // const { data: product } = await WooCommerce.get(`products/${id}`);
        const { data: product } = await axios.get(
          `${siteURL}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`
        );
        return product;
      })
    );

    setRelatedProducts(products);
  }

  const imagesGallery = product?.images.map(img => ({ url: img.src }));

  // console.log({ product  })

  useEffect(() => {
    // console.log('useEffect :: ', { product })

    if (product) {
      setProductDescription(product.description);
    }
  }, [product]);

  return (
    <>
      <ProductDetailsWrapper ref={parentRef} className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview style={{ height: "40rem" }}>
            <CarouselWithCustomDots
              items={imagesGallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
          <Text mb="2" color="GrayText">
            {product.categories?.[0]?.name}
          </Text>

          <ProductTitlePriceWrapper>
            {/* <ProductTitle>{product.title}</ProductTitle>  // OLD */}
            <ProductTitle>{product.name}</ProductTitle>
            <Text color="GrayText" fontSize="20" mx="3" alignSelf="center">
              {product.attributes.find(
                attribute => attribute.name === "συσκευασία"
              )?.options[0] || ""}
            </Text>
          </ProductTitlePriceWrapper>

          {/* Short Description */}
          {product.short_description && (
            <Text
              color="GrayText"
              noOfLines={3}
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}
          {/* <Text color="GrayText" noOfLines={3} dangerouslySetInnerHTML={{ __html: product.short_description }} /> */}

          <ProductPriceWrapper>
            <Heading fontSize="26">
              {CURRENCY}
              {product.sale_rice ? product.sale_price : product.regular_price}
            </Heading>
            {product.sale_price ? ( // COMBAK: May be percentage here
              <SalePrice>
                {CURRENCY}
                {product.price}
              </SalePrice>
            ) : null}
          </ProductPriceWrapper>

          <Divider borderColor="gray.300" mt="6" />

          <ProductCartWrapper>
            <ProductCartBtn>
              {!isInCart(data.id) ? (
                <Button
                  className="cart-button"
                  variant="primary"
                  size="big"
                  onClick={e => {
                    handleAddClick(e);
                    if (deviceType.mobile) {
                      openModal({
                        show: true,
                        config: {
                          className: "cartPopup",
                          width: "auto",
                          height: "auto",
                          enableResizing: false,
                          disableDragging: true,
                          transition: {
                            tension: 360,
                            friction: 40,
                          },
                        },
                        closeOnClickOutside: true,
                        component: Cart,
                        closeComponent: () => <div />,
                        componentProps: {
                          onCloseBtnClick: closeModal,
                          scrollbarHeight: 330,
                        },
                      });
                    } else {
                      toggleCart();
                    }
                  }}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage
                      id="addToCartproductButton"
                      defaultMessage="Προσθήκη στο Καλάθι"
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(data.id).quantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                  className="card-counter"
                  variant="altHorizontal"
                />
              )}
            </ProductCartBtn>
          </ProductCartWrapper>

          <Divider borderColor="gray.300" mt="6" />

          <Stack py="6">
            <HStack>
              <Text>Διαθεσιμότητα: </Text>
              <Text color="GrayText">
                {
                  product.attributes.find(att => att.name === "διαθεσιμότητα")
                    ?.options?.[0]
                }
              </Text>
            </HStack>
            <HStack>
              <Text>Κωδικός Προϊόντος: </Text>
              <Text color="GrayText">{product.sku}</Text>
            </HStack>
            {/* //TEMP */}
            <ProductMeta>
              <Text>Κατηγορίες: </Text>
              <MetaSingle>
                {product?.categories?.map((item: any) => (
                  <Link
                    href={`/${decodeURIComponent(item.slug)}`}
                    key={`link-${item.id}`}
                  >
                    <a>
                      <MetaItem>{item.name}</MetaItem>
                    </a>
                  </Link>
                ))}
              </MetaSingle>
            </ProductMeta>
          </Stack>

          <Divider borderColor="gray.300" my="8" />

          {/* Upsells Items */}
          {upsellsProducts.length > 0 && (
            <>
              <Heading as="h1" fontSize="22" fontWeight="semibold" pb="6">
                Συνδυάζεται με
              </Heading>
              <Stack>
                {upsellsProducts.map((product: any, idx: number) => (
                  <BumpCard key={idx.toString()} product={product} />
                ))}
              </Stack>

              <Divider borderColor="gray.300" mt="10" />
            </>
          )}

          {product.description && (
            <Stack py="6">
              <Heading as="h1" fontSize="22" fontWeight="semibold" pb="2">
                Ιδιότητες
              </Heading>
              <p
                color="GrayText"
                dangerouslySetInnerHTML={{ __html: productDescription }}
              />
            </Stack>
          )}

          {/* Features */}
          <Heading my="4" as="h1" fontSize="22" fontWeight="semibold" pb="2">
            Σύνθεση
          </Heading>
          <Wrap spacing="0px" flex="2" lineHeight={10}>
            {product.attributes &&
              product.attributes.length > 0 &&
              product.attributes.map((attribute, idx) => (
                <HStack key={idx} borderWidth="1px" w="100%" fontSize="16">
                  <Box w="35%" textAlign="right">
                    <Text>{attribute.name}</Text>
                  </Box>
                  <Divider orientation="vertical" />
                  <Stack w="65%" spacing={0}>
                    {attribute.options &&
                      attribute.options.length > 0 &&
                      attribute.options.map((option, idx) => (
                        <Text color="GrayText" key={idx} py="0" mb="-1">
                          {option}
                        </Text>
                      ))}
                  </Stack>
                </HStack>
              ))}
          </Wrap>
          {!!product.dimensions["length"] ||
            !!product.dimensions.width ||
            !!product.dimensions.height ||
            (!!product.weight && (
              <Wrap
                borderWidth="1px"
                spacing="0px"
                flex="1"
                mt={10}
                lineHeight={10}
                bgColor="#f2f2f2"
                py={1}
                px={8}
              >
                <HStack w="100%" fontSize="18">
                  <Box>Διαστάσεις</Box>
                </HStack>
              </Wrap>
            ))}
          {!!product.weight && (
            <Wrap
              borderWidth="1px"
              spacing="0px"
              flex="2"
              mt={10}
              lineHeight={10}
            >
              <HStack w="100%" fontSize="16">
                <Box w="35%" textAlign="right" fontWeight="700">
                  <Text>Βάρος</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box w="65%">
                  <Text>{product.weight}</Text>
                </Box>
              </HStack>
            </Wrap>
          )}
          {(!!product.dimensions["length"] ||
            !!product.dimensions.width ||
            !!product.dimensions.height) && (
            <Wrap
              borderWidth="1px"
              borderTop="none"
              spacing="0px"
              flex="2"
              lineHeight={10}
            >
              <HStack w="100%" fontSize="16">
                <Box w="35%" textAlign="right" fontWeight="700">
                  <Text>Διαστάσεις</Text>
                </Box>
                <Divider orientation="vertical" />
                <Box w="65%">
                  <Text>
                    {product.dimensions["length"] &&
                      `${product.dimensions["length"]}cm ×`}{" "}
                    {product.dimensions.width &&
                      `${product.dimensions.width}cm ×`}{" "}
                    {product.dimensions.height &&
                      `${product.dimensions.height}cm`}
                  </Text>
                </Box>
              </HStack>
            </Wrap>
          )}
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              // items={product.gallery}
              items={imagesGallery}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      {relatedProducts.length > 0 && (
        <RelatedItems>
          <h2 style={{ textAlign: "center" }}>
            <FormattedMessage
              id="intlRelatedproductsItems"
              defaultMessage="Άλλοι χρήστες αγόρασαν"
            />
          </h2>

          <ProductGrid
            type={product.type.toLowerCase()}
            loadMore={false}
            fetchLimit={5}
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
            deviceType={deviceType}
            productsData={relatedProducts}
          />
        </RelatedItems>
      )}
    </>
  );
};

export default ProductDetails;
