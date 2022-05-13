import axios from "axios";
import jwt from 'jwt-decode'
import WooCommerce from "lib/woocommerce";
import { consumerKey, consumerSecret, siteURL } from "site-settings/site-credentials";

interface UpdateProps {
  id: number
  name: string
  surname: string
  email: string
  primaryPhone: string
  secondaryPhone: string
  address: string
  city: string
  postalCode: string
  region: string
}
export async function updateCustomer(data: UpdateProps) {
  const _data = {
    first_name: data.name,
    last_name: data.surname,
    billing: {
      first_name: data.name,
      last_name: data.surname,
      address_1: data.address,
      city: data.city,
      email: data.email,
      phone: data.primaryPhone,
      postcode: data.postalCode,
      state: data.region
    },
    shipping: {
      first_name: data.name,
      last_name: data.surname,
      address_1: data.address,
      city: data.city,
      email: data.email,
      phone: data.primaryPhone,
      postcode: data.postalCode,
      state: data.region
    }
  }
  
  try {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/customers/${data.id}?consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`, _data);
    console.log({ res });

    if (res.status !== 200) throw new Error("Not success")

    localStorage.setItem("customer", JSON.stringify(res.data));

    return {
      customer: res.data
    }
  } catch (error) {
    console.log("/customers -> createCustomer :: ", { error });
    return { error: "Something went wrong!" };
  } 
}

export async function createCustomer(data) {
  try {
    const res = await 
      axios.post(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/wp-json/wc/v3/customers?consumer_key=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET}`, data);
    // console.log({ res });


    if (res.status !== 201) throw new Error("Not success")

    // if (res.status === 201 || res.status === 200) {
    localStorage.setItem("customer", JSON.stringify(res.data));

    return {
      customer: res.data
    }
  } catch (error) {
    console.log("/customers -> createCustomer :: ", { error });
    return { error: "Something went wrong!", errorStatus: error.response.status };
  }
}

export async function loginCustomer({ email, password }) {
  try {
    const { data } = await axios.post(`${siteURL}/wp-json/jwt-auth/v1/token`, { username: email, password });
    const id = data.data.id;

    const { data: customer } = await axios.get(`${siteURL}/wp-json/wc/v3/customers/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);

    return { customer };
  } catch (error) {
    console.log("/customers -> loginCustomer :: ", { error })
    return { error: "Invalid credentials!" }
  }
}

export async function fetchCustomerByEmail(email) {
  try {
    const { data: customers } = await axios.get(`${siteURL}/wp-json/wc/v3/customers?email=${email}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
    const customer = customers[0];
    
    return { customer };
  } catch (error) {
    console.log('services/customer/fetchCustomerByEmail :: ', { error });
    return { error: 'Something went wrong...' }
  }
}

// export async function loginCustomer({ email, password }) {
//   try {
//     const { data: customers } = await WooCommerce.get("customers", { email });
//     // console.log({ customers });

//     if (customers.length === 0) throw new Error("Customer not found!");

//     const customer = customers[0];

//     const res = await axios.patch("api/customers", { ...customer, password });
//     if (res.data.success === false) throw new Error("Customer not found!");

//     return { customer: customer };
//   } catch (error) {
//     console.log("/customers -> loginCustomer :: ", { error })
//     return { error: "Invalid credentials!" }
//   }
// }
