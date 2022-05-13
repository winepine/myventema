export default function getProductURI(link: string) {
  const productURI = link.split("/").slice(3).join("/");
  return productURI;
}