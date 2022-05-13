import { PageResultStyles } from "./carousal.styles";
import React, { useEffect, useState } from "react";
import Carousel from "./carousal";
import { useMedia } from "utils/use-media";
import axios from "axios";
import { Text } from "@chakra-ui/react";

const RelatedProducts = ({ products, infinite=false }) => {
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");

  if (products.length === 0) return <Text>Δεν βρέθηκαν αποτελέσματα</Text>;
  return (
    <PageResultStyles>
      <Carousel infinite={infinite} deviceType={{ mobile, tablet, desktop }} data={products} />
    </PageResultStyles>
  );
};

export default RelatedProducts;
