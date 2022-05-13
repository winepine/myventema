import WooCommerce from 'lib/woocommerce';
import _ from 'lodash';

export async function getExtractedAttributes({ products }: { products: any[] }) {
  const mainAttributes = []

  const attributes = [];
  products.forEach(product => {
    attributes.push(...product.attributes);
  });

  const uniqAttributes = _.uniqBy(attributes, 'id');
  mainAttributes.push(...uniqAttributes);

  const attributeTerms1 = [];
  mainAttributes.forEach(mainAttr => {
    const attributeTerms = [];
    attributes.forEach(attr => {
      if (mainAttr.id === attr.id) {
        attributeTerms.push(...attr.options);
      }
    })
    attributeTerms1.push({ attribute: mainAttr, attributeTerms: _.uniq(attributeTerms) });
  })

  // Nick: Please do not show two attributes {id: 2, name: 'συσκευασία'} and {id: 3, name: 'σύνθεση'}
  const filteredAttributes = attributeTerms1.filter(attr => attr.attribute.id !== 2 && attr.attribute.id !== 3 );

  const results = await Promise.all(filteredAttributes.map(async (attr) => {
    const ID = attr.attribute.id;
    const { data } = await WooCommerce.get(`products/attributes/${ID}`);
    const { data: data2 } = await WooCommerce.get(`products/attributes/${ID}/terms`);
    return { attribute: data, attributeTerms: data2 };
  }))

  return { attributes: results };
}