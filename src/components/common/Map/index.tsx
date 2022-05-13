import React from 'react';
import GoogleMapReact from "google-map-react";
import MyMarker from './MyMarker';
import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { googleMapKey, googleMapRegion } from 'site-settings/site-credentials';

interface Props {
  lat: number,
  lng: number
};

const Map:FC<Props> = ({ lat, lng }) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: googleMapKey,
        language: "en",
        region: googleMapRegion,
      }}
      defaultCenter={{ lat: 39.074208, lng: 21.824312 }}
      defaultZoom={12}
      center={{ lat: lat || 39.074208, lng: lng || 21.824312 }}
    >
      <MyMarker  />
    </GoogleMapReact>
  )
}

export default Map
