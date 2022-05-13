import { Box, Circle, Icon } from "@chakra-ui/react";
import React from "react";
import { FaMapPin } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si'
 
const MyMarker = ({  }) => (
  <Icon color="primary.100" as={SiGooglemaps} fontSize="40" textShadow="base" />
);

export default MyMarker;