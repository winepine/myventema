import { useEffect, useState } from 'react';
import _ from 'lodash';
import WooCommerce from 'lib/woocommerce';

const useExtractAttributes = ({ products }) => {
  // const [attributes, setAttributes] = useState<any[]>([])
  
  // useEffect(() => {
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
    // console.log({ attributes, mainAttributes, attributeTerms1 });


    // Nick: Please do not show two attributes {id: 2, name: 'συσκευασία'} and {id: 3, name: 'σύνθεση'}
    const filteredAttributes = attributeTerms1.filter(attr => attr.attribute.id !== 2 && attr.attribute.id !== 3 );
    // console.log({ filteredAttributes })

    // setAttributes(filteredAttributes)
  // }, [])

  return { attributes: filteredAttributes }
}

export default useExtractAttributes
