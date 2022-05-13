import React, { useEffect, useState } from 'react'

const useProductLink = (product) => {
  const [categorySlug, setCategorySlug] = useState("");
  const [productSlug, setProductSlug] = useState("");

  useEffect(() => {
    if (!product) {
      setCategorySlug("");
      setProductSlug("");

      return;
    }

    const splitted = product.permalink.split("/");
    setCategorySlug(splitted[3]);
    setProductSlug(splitted[4]);
  }, [product])

  return { categorySlug, productSlug }
}

export default useProductLink
