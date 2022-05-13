const url = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

import vendors from '../../../public/api/vendors.json';

export async function getAllVendors() {
  return vendors
}
export async function getVendorBySlug(slug) {
  return vendors.find((current) => current.slug === slug);
}


// LEGACY CODE
// export async function getAllVendors() {
//   const vendors = await fetch(`${url}/api/vendors.json`);
//   return await vendors.json();
// }
// export async function getVendorBySlug(slug) {
//   const vendors = await fetch(`${url}/api/vendors.json`).then((res) =>
//     res.json()
//   );
//   return vendors.find((current) => current.slug === slug);
// }