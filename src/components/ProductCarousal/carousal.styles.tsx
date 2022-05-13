import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
const PageResultStyles = styled.div`
  width: 100%;
  display: block;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  border-bottom: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};

  @media (max-width: 1199px) and (min-width: 991px) {
    padding: 20px 15px;
    .prevButton {
      left: 0;
    }

    .nextButton {
      right: 0;
    }
  }
  @media (max-width: 990px) {
    padding: 15px;
    border-bottom: 0;

    .prevButton {
      left: 5px;
    }

    .nextButton {
      right: 5px;
    }
  }
`;
export { PageResultStyles };
