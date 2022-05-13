import type { NextApiRequest, NextApiResponse } from 'next'
import { appendDataIntoCollection, getDataFromCollection, getSingleDocument, insertDataIntoCollection } from '../../../services/mongodb'

interface ResponseData {
  method: string
  success: boolean,
  category: {} | string
}
export default async function handlers(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const categorySlug = req.query.slug;

  const { document: category, error } = await getSingleDocument("categories", { "category.slug": categorySlug });

  console.log({ categorySlug, category })

  if (error) {
    return res.status(500).json({ method: req.method, success: false, category: {} })
  }

  res.status(200).json({ method: req.method, success: true, category: category ?? {} });
}