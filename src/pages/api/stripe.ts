import { NextApiRequest, NextApiResponse } from "next";
import { stripeSecretKey } from "site-settings/site-credentials";

// --> asad
const stripe = require('stripe')(stripeSecretKey);

export default async function handler(req: any, res: NextApiResponse<any>) {
  try {
    const data = await stripe.charges.create({
      amount: req.body.data.amount,
      currency: 'eur',
      source: req.body.token.id,
      description: "Order description....",
      metadata: {
        productId: "prod1"
      },
    })

    return res.status(200).json({ charges: data })
  } catch (error) {
    console.log('serverSide :: ', { error });
    return res.status(400).json({ error: 'Something went wrong...' })
  }
};