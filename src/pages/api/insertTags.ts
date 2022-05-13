import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllWCCategories } from 'services/categories';
import { getAllWCProducts } from 'services/products';
import { getAllWCTags } from 'services/tags';
import { getDataFromCollection, insertDataIntoCollection } from '../../services/mongodb'
import _ from 'lodash';

interface ResponseData {
  method: string
  success: boolean,
  // products: any[]
  // categories: any[]
  tags: any[]
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const tagsData = await getAllWCTags();

  const { data: tags, error: tagsError } = await insertDataIntoCollection(tagsData, "tags");

  res.status(200).json({ 
    method: req.method, 
    success: true,  
    tags: tags ?? [],
  });
}