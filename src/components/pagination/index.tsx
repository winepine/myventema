import React, { FC } from "react";
import {
  ButtonProps,
  ChakraProvider
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup
} from "chakra-paginator";
import { useRouter } from "next/router";
import Router from 'next/router';

interface Props {
  totalItems: number
}

const Pagination: FC<Props> = ({ totalItems }) => {
  
  
  // constants
  const outerLimit = 2;
  const innerLimit = 2;
  
  const {
    isDisabled,
    pagesQuantity,
  } = usePaginator({
    total: totalItems,
    initialState: {
      pageSize: 36,
      currentPage: 1,
      isDisabled: false
    }
  });
  const router = useRouter();
  // console.log('Pagination :: ', { router })

  // styles
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm"
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "gray.200"
    },
    // bg: "gray.300",
    bg: "white",
    color: '#292929'
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "#f35c75"
    },
    bg: "#FD5A89",
    color: "white",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
  };

  // handlers
  const handlePageChange = (nextPage: number, router) => {
    const { category, pageNumber, ...rest } = Router.query;

    Router.push({
      pathname: Router.pathname,
      query: {
        ...Router.query,
        page: nextPage,
      }
    }, "", { shallow: true });

    window.scroll({ top: 0, behavior: 'smooth' })
  };

  return (
    // <ChakraProvider>
      <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={Number(router.query?.pageNumber) || 1}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={(pageNumber) => handlePageChange(pageNumber, router)}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous>
            Προηγούμενη Σελίδα {/* Previous */}
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next colorScheme="gray">
            Επόμενη Σελίδα {/* Next */}
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
    // </ChakraProvider>
  );
};

export default Pagination;