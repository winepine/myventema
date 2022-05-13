import type { NextApiRequest, NextApiResponse } from 'next'
import { appendDataIntoCollection, getDataFromCollection, insertDataIntoCollection } from '../../services/mongodb'

interface ResponseData {
  method: string
  success: boolean,
  customers: any[]
}
export default async function customers(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // For login
  if (req.method === "PATCH") {
    const customerReq = req.body;
    let _customer = null

    const { products: customers, error } = await getDataFromCollection("customers");

    _customer = customers.find(customer => customer.email === customerReq.email && customer.password === customerReq.password);

    if (error || !_customer) {
      return res.status(500).json({ method: req.method, success: false, customers: [] })
    }

    res.status(200).json({ method: req.method, success: true, customers: [_customer] ?? [] });
  }

  // POST
  if (req.method === "POST") {
    const { data, error } = await appendDataIntoCollection(req.body, "customers");
  
    if (error) {
      console.log({ error })
      return res.status(500).json({ method: req.method, success: false, customers: [] });
    }
  
    res.status(200).json({ method: req.method, success: true, customers: [] });
  } 
}