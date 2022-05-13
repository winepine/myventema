import  {
  geocodeByAddress,
} from "react-places-autocomplete";

export const getMapGeocodeFromAddress = async (address) => {
  const responseByAddress = await geocodeByAddress(address);

  const { state, city, postalCode, lat, lng } = getAddressData(responseByAddress);

  return { lat, lng }
}

export default function getAddressData(responseByAddress) {
  let country: string = "";
  let state: string = "";
  let city: string = "";
  let postalCode: string = "";
  let addressRoute: string = "";

  const lat = responseByAddress[0].geometry.location.lat();
  const lng = responseByAddress[0].geometry.location.lng();

  const addressComponents = responseByAddress[0].address_components;

  for (let i = 0; i < addressComponents.length; i++) {
    for (let j = 0; j < addressComponents[i].types.length; j++) {
      const type = addressComponents[i].types[j];
      if (type === "country") 
        country = addressComponents[i].long_name;
      if (type === "locality" || type === "administrative_area_level_4")
        city = addressComponents[i].long_name;
      if (type === "administrative_area_level_3" || type === "administrative_area_level_1") 
        state = addressComponents[i].long_name;
      if (type === "postal_code") 
        postalCode = addressComponents[i].long_name;
      if (type === "route")
        addressRoute = addressComponents[i].long_name
    }
  }

  return {
    country,
    state, 
    city,
    postalCode,
    addressRoute,
    lat,
    lng
  } 
}