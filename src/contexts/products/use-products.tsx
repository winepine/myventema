import React, { useReducer, useContext, createContext } from 'react';
import { reducer } from './products.reducer';
import _ from 'lodash';

const ProductsContext = createContext({} as any);
const INITIAL_STATE = {
  products: []
};

const useProductsActions = (initialProductsState = INITIAL_STATE) => {
  const [state, dispatch] = useReducer(reducer, initialProductsState);

  function onSetProducts(products: any[]) {
    console.log({ products });
    dispatch({ type: 'SET_PRODUCTS', payload: products });
  }

  return {
    state,
    onSetProducts
    // isLoading,
  };
};

export const ProductsProvider = ({ children }) => {
  const {
    state,
    // isLoading,
    onSetProducts
  } = useProductsActions();

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        onSetProducts
        // isLoading: isLoading
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
