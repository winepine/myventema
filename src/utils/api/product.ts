const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

import productsData from '../../../public/api/products.json';

export async function getAllProducts() {
  return productsData;
}
export async function getProductBySlug(slug) {
  return productsData.find((current) => current.slug === slug);
}

// Legacy code
// export async function getAllProducts() {
//   const products = await fetch(`${url}/api/products.json`);

//   return await products.json();
// }
// export async function getProductBySlug(slug) {
//   const products = await fetch(`${url}/api/products.json`).then((res) =>
//     res.json()
//   );

//   // console.log('/utils/api/product.ts ::', { productBySlug: products });

//   return products.find((current) => current.slug === slug);
// }

