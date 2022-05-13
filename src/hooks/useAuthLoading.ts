import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from 'contexts/auth/auth.context';

const useAuthLoading = () => {
  const { authState, authDispatch } = useContext<any>(AuthContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // console.log({ authState })

  useEffect(() => {
    setLoading(true);
    setShow(authState.isAuthenticated);

    setTimeout(() => {
      setLoading(false)
    }, 800);
  }, [authState.isAuthenticated]);

  return { loading, show }; 
}

export default useAuthLoading
