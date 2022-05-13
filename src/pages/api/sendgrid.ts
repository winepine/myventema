import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { sendGridApiKey, sendGridEmailFrom } from 'site-settings/site-credentials';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize with api key
  sgMail.setApiKey(sendGridApiKey);

  const { customerEmail, name, message, html } = req.body;
  // console.log({ params })

  const bodyForCustomer = {
    to: customerEmail,
    from: sendGridEmailFrom,
    subject: 'Buying Guide - All4skin',
    // text: 'Thanks for contact us, we appreciate your query, sfkshop team will be back to you soon',
    html
  };

  try {
    await sgMail.send(bodyForCustomer);
    // const sendEmailToManagementTeam = sgMail.send(bodyForManagementTeam);

    // await Promise.all([sendEmailToManagementTeam, sendEmailToCustomer])

    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }

    return res.status(500).send({ success: false })
  }
}
