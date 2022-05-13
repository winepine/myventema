import React, { useEffect, useState } from 'react'
import { updateCustomer } from 'services/customer';

const useCustomer = () => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));

    if (!customer) {
      return;
    }

    setId(customer.id);
    setName(customer.first_name);
    setSurname(customer.last_name);
    setEmail(customer.email);
    setPrimaryPhone(customer.billing.phone);
    setSecondaryPhone(customer.shipping.phone);
    setAddress(customer.shipping.address_1);
    setCity(customer.shipping.city);
    setPostalCode(customer.shipping.postcode);
    setRegion(customer.shipping.state);
  }, [])

  return { 
    id,
    name, 
    surname, 
    email, 
    primaryPhone, 
    secondaryPhone, 
    address, 
    city, 
    postalCode, 
    region,
    setName,
    setSurname,
    setEmail,
    setPrimaryPhone,
    setSecondaryPhone,
    setAddress,
    setCity,
    setPostalCode,
    setRegion
  };
}

export default useCustomer
