import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_DOMAIN_URL,
  consumerKey: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
  version: 'wc/v3',
  axiosConfig: {
    headers: {}
  }
});

export default WooCommerce;