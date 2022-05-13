import React, { useEffect, useState } from 'react'
import { 
  Container, 
} from '@chakra-ui/react'
import OrderTrackingForm from 'components/Pages/OrderTracking/OrderTrackingForm'
import axios from 'axios';
import OrderTrackingDetails from 'components/Pages/OrderTracking/OrderTrackingDetails';


import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { consumerKey, consumerSecret, frontEndDomain, siteURL } from 'site-settings/site-credentials';

const TrackingOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async ({ orderId, email }) => {
    setError(null);
    setOrder(null);

    setLoading(true);
    try {
      const {data: order} = await axios.get(`${siteURL}/wp-json/wc/v3/orders/${orderId}?per_page=50&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`)

      if (order.billing.email === email) {
        setOrder(order);
      } else {
        // Translations:: 'Το email ή ο αριθμός παραγγελίας είναι λάθος' --> 'Email or Order ID is invalid.'
        setError('Το email ή ο αριθμός παραγγελίας είναι λάθος.')
      }

      setLoading(false);
    } catch (error) {
      console.log('orderTracking :: ', { error });
      setLoading(false);
      // Translation:: 'Το email ή ο αριθμός παραγγελίας είναι λάθος' --> 'Email or Order ID is invalid.'
      setError('Το email ή ο αριθμός παραγγελίας είναι λάθος.')
    }
  }

  return (
    <>
      <SEOWrapper />
      <Container centerContent maxW="container.xl" py={{ base: "28", md: "48" }} minH="85vh">
        {order ? 
          <OrderTrackingDetails order={order} /> :
          <OrderTrackingForm
          loading={loading}
          error={error}
          onSubmit={handleFormSubmit}
        />}
      </Container>
    </>
  )
}

function SEOWrapper() {
  return (
    <>
      {/* SEO Imrovments (Start) */}
      <Head>
        <title>Παρακολούθηση Παραγγελιών - All4skin</title>
      </Head>

      <NextSeo 
        description="Παρακολούθηση Παραγγελιών Τσέκαρε τη πορεία της παραγγελίας σου Αναζήτηση Αριθμού αποστολής"      
        robotsProps={{
          maxSnippet: -1,
          maxVideoPreview: -1,
          maxImagePreview: "large"
        }}
        canonical={`${frontEndDomain}/order-tracking/`}
        openGraph={{
          locale: 'el_GR',
          type: 'article',
          title: 'Παρακολούθηση Παραγγελιών - SFKshop',
          description: 'Τσέκαρε τη πορεία της παραγγελίας σου',
          url: `${frontEndDomain}/order-tracking/`,
          site_name: 'SFKshop',
          images: [
            {
              url: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              secureUrl: `${siteURL}/wp-content/themes/rehub-theme/images/default/blank.gif`,
              alt: 'Παρακολούθηση Παραγγελιών'
            }
          ],
          article: {
            modifiedTime: new Date().toISOString()
          },
        }}
        twitter={{
          cardType: 'summary_large_image'
        }}
      />
      {/* SEO Imrovments (End) */}
    </>
  )
}

export default TrackingOrder
