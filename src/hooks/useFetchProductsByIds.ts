import axios from 'axios';
import {useState, useEffect} from 'react';
import { consumerKey, consumerSecret, siteURL } from 'site-settings/site-credentials';

const useFetchProductsByIds = (prods) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAsyncData();

    async function getAsyncData() {
      setLoading(true)

      let products = [];
      try {
        products = await Promise.all(prods.map(async (productData) => {
          const { data: product } = await axios.get(`${siteURL}/wp-json/wc/v3/products/${productData.product_id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
          return product;
        })) ;

        setLoading(false);
      } catch (error) {
        console.log("/order -> getOrderProductsAsync :: ", { error })
        setProducts([]);

        setLoading(false);
        return;
      }

      const schemaProducts = await prods.map((product: any) => {
        const targetProduct: any = products.find((prod: any) => prod.id === product.product_id);

        return { 
          id: product.id,
          image: targetProduct?.images?.[0]?.src || "",
          permalink: targetProduct?.permalink || "",
          price: product.price,
          title: product.name,
          total: product.total,
          quantity: product.quantity,
          subtotal: product.subtotal
        }
      })

      setProducts(schemaProducts);
    }
  }, [])

  return { products, loading }
};

export default useFetchProductsByIds;
