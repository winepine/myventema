import axios from 'axios';

export async function getAllWCCategories() {
  const categories = [];
  let page = 1;

  while (true) {
    // const { data } = await axios.get(`${"https://sfkshop.gr"}/wp-json/wc/v3/products?consumer_key=${"ck_9357bc41a1c3fa9dfb9d230c90844342b79b313e"}&consumer_secret=${"cs_298646a32cf6d3fe13bead4f16ecf3dbc9feb7a0"}&per_page=100&page=${page}`, {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}&per_page=100&page=${page}`, {
      headers: { Accept: "application/json" },
    });
    categories.push(...data);
    
    if (data.length < 100) {
      break;
    }

    console.log("Page no." + page + " of categories created succesffuly")
    
    page++
  }

  return categories;
}