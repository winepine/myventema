import axios from "axios";

export async function createOrder(data, cartItems) {
  const customerFromLocalStorage = JSON.parse(localStorage.getItem('customer'));

  // console.log({ data });

  // Let's decide which shipping line is need to use
  let shippingLine = {}
  if (data.selectedShippingLine === "acs_courier") {
    shippingLine = {
      method_id: "flat_rate",
      method_title: "ACS Courier",
      total: "3.50"
    }
  } else {
    shippingLine = {
      method_id: "local_pickup",
      method_title: "Παραλαβή από το κατάστημα", // collect from the store
      total: "0.00"
    }
  }

  const fee_lines = [
    // Adding conditional object in array
    ...(data.selectedPaymentOptionValue === 'pay on delivery' ? [{
      name: "Αντικαταβολή", // 'Αντικαταβολή' --> Cash on 
      total: "2.00",
    }] : []),
  ]

  const orderData = {
    status: "processing",
    customer_id: customerFromLocalStorage ? customerFromLocalStorage.id : 0,
    // customer_id: 0,
    payment_method: data?.paymentOptions?.payment_method,
    payment_method_title: data?.paymentOptions?.payment_method_title,
    set_paid: data?.paymentOptions?.paid,
    billing: {
      first_name: data.name,
      last_name: data.surname,
      address_1: data.address,
      address_2: "",
      city: data.city,
      state: data.region,
      postcode: data?.postalCode?.toString(),
      country: "gr",
      email: data.email,
      phone: data.phoneNumber
    },
    shipping: {
      first_name: data?.name_2 || data.name,
      last_name: data?.surname_2 || data.surname,
      address_1: data?.address_2 || data.address,
      address_2: "",
      company: data.companyName_2 || "",
      city: data.city_2 || data.city,
      state: data.region_2 || data.region,
      postcode: data?.postalCode_2?.toString() || data?.postalCode?.toString(),
      country: "gr",
    },
    line_items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
    shipping_lines: [shippingLine],
    fee_lines: fee_lines
  };

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/orders?consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`, orderData)
    console.log("/order :: ", { res })

    return {
      status: res.status,
      resData: res.data,
      // status: 201
    }  
  } catch (error) {
    console.log({ error });
    return {
      error: error.message
    }
  }
}