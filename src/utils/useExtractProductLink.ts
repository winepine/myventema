import { useEffect, useState } from "react";

export default function extractProductLink(productLink: string) {
  const [productURI, setProductURI] = useState("#");

  useEffect(() => {
    const productURI = productLink.split("/").slice(3).join("/");  // ---> category/productID/
    // console.log({ productURI });
    setProductURI(productURI);
  }, [])

  return { productURI }
}