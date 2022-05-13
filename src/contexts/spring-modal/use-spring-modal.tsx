import { useRouter } from 'next/router';
import React, { useReducer, useContext, createContext } from 'react';
import { useEffect } from 'react';
// import { fetchWishlistProductsService } from 'services/whislist';
import { reducer } from './spring-modal.reducer';
// import { useStorage } from 'utils/use-storage';
const SpringModalContext = createContext({} as any);
const INITIAL_STATE = {
  // items: [],
  isOpen: false
};

const useSpringModalActions = (initialSpringModalState = INITIAL_STATE) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialSpringModalState);

  useEffect(() => {
    router.events.on('routeChangeStart', handleModalClose)
  }, [router.events])

  const handleModalOpen = () => {
    dispatch({ type: 'OPEN_MODAL', payload: true })
  }

  const handleModalClose = () => {
    dispatch({ type: 'CLOSE_MODAL', payload: false })
  }

  return {
    state,
    handleModalOpen,
    handleModalClose
  };
};

export const SpringModalProvider = ({ children }) => {
  const {
    state,
    handleModalOpen,
    handleModalClose
  } = useSpringModalActions();

  return (
    <SpringModalContext.Provider
      value={{
        isOpen: state.isOpen,
        onModalOpen: handleModalOpen,
        onModalClose: handleModalClose
      }}
    >
      {children}
    </SpringModalContext.Provider>
  );
};

export const useSpringModal = () => useContext(SpringModalContext);
