import React, { useEffect, useState } from 'react';
import { useCart } from 'contexts/cart/use-cart';
import axios from 'axios';
import getRandomInt from 'utils/getRandomInt';
import useProductLink from 'hooks/useProductLink';
import BumpCard from './Card';

const OrderBump = () => {
  const { addItem, removeItem, isInCart, getItem, toggleCart, items } = useCart();
  const searchQuery = "Try Me"
  const [product, setProduct] = useState(null);
  const { categorySlug, productSlug } = useProductLink(product);


  useEffect(() => {
    async function getAsyncData() {
      const ATTRIBUTE = "pa_τύπος";
      const ATTRIBUTE_TERM = "185"

      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/products?search=${searchQuery}&per_page=100&attribute=${ATTRIBUTE}=&attribute_term=${ATTRIBUTE_TERM}&consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`);
      // console.log({ data });

      
      let randomProduct = null;
      while(true) {
        const randomIndex = getRandomInt(data.length);
        randomProduct = data[randomIndex];

        if (!isInCart(randomProduct.id)) {
          // console.log('I am not in cart :: ', { randomProduct })
          break;
        }
      }

      setProduct(randomProduct)
    }
    getAsyncData();
  }, [])

  // If product has added to the cart then do not show again
  useEffect(() => {
    if (!product) return;

    setProduct(null); 
  }, [items])

  if (!product || !categorySlug || !productSlug) return null;

  return (
    <BumpCard 
      product={product} />
  )
}

export default OrderBump
