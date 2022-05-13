import type { NextApiRequest, NextApiResponse } from 'next'
import { getDataFromCollection, insertDataIntoCollection } from '../../services/mongodb'

interface ResponseData {
  method: string
  success: boolean,
  products: any[]
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // GET 
  if (req.method === "GET") {
    const { products, error } = await getDataFromCollection("tags");

    if (error) {
      return res.status(500).json({ method: req.method, success: false, products: [] })
    }

    res.status(200).json({ method: req.method, success: true, products: products ?? [] });
  }

  // POST
  if (req.method === "POST") {
    const { data, error } = await insertDataIntoCollection(req.body, "tags");
  
    if (error) {
      return res.status(500).json({ method: req.method, success: false, products: [] });
    }
  
    res.status(200).json({ method: req.method, success: true, products: data ?? [] });
  } 
}