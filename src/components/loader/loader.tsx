import React from "react";
import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const rotate = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;

const Spinner = styled.div`
  margin-top: 30px;
  width: 24px;
  height: 24px;
  border: 4px solid ${themeGet("colors.white", "#ffffff")};
  border-top: 3px solid
    ${props =>
      props.color
        ? props.color
        : themeGet("colors.primary.regular", "#EA870E")};
  border-radius: 50%;
  transition-property: transform;
  animation-name: ${rotate};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Loader = color => {
  return <Spinner {...color} />;
};

export default Loader;
