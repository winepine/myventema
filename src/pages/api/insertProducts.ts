import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllWCCategories } from 'services/categories';
import { getAllWCProducts } from 'services/products';
import { getAllWCTags } from 'services/tags';
import { getDataFromCollection, insertDataIntoCollection } from '../../services/mongodb'
import _ from 'lodash';

interface ResponseData {
  method: string
  success: boolean,
  products: any[]
  // categories: any[]
  // tags: any[]
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const data = await getAllWCProducts();
  // const tagsData = await getAllWCTags();
  // const categoriesWC = await getAllWCCategories();

  const { data: products, error: productsError } = await insertDataIntoCollection(data, "products");
  // const { data: tags, error: tagsError } = await insertDataIntoCollection(tagsData, "tags");

  // Inserting categories with products in DB
  // const filteredCategoriesWithProducts = getProductByCategory({ products, categories: categoriesWC });
  // const { data: categories, error: categoriesError } = await insertDataIntoCollection(filteredCategoriesWithProducts, "categories");


  res.status(200).json({ 
    method: req.method, 
    success: true, 
    products: products ?? [], 
    // tags: tags ?? [],
    // categories: categories ?? []
  });
}


function getProductByCategory({ products, categories }) {
  const filteredCategoriesWithProducts = categories.map(category => {
    const filteredProducts = _.filter(products, (product) => {
      const categories = product.categories;
      return _.some(categories, { id: category.id });
    });

    const subCategories = categories.filter(cat => cat.parent === category.id);
    // console.log({ category, subCategories });

    return { category, subCategories, products: filteredProducts }
  });

  return filteredCategoriesWithProducts;
}