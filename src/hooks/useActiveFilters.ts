import { filter } from '@chakra-ui/styled-system';
import WooCommerce from 'lib/woocommerce';
import { useRouter } from 'next/router';
import { useState, useEffect, FC } from 'react'
// import Router from 'next/router';

const useActiveAttributeFilets = () => {
  const [activeFilter, setActiveFilter] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getAsyncData() {
      if (router.query?.attributeId && router.query?.attributeTerm) {
        const { data } = await WooCommerce.get(`products/attributes/${router.query?.attributeId}/terms/${router.query?.attributeTerm}`)
        setActiveFilter([{ id: 2, name: data.name } ])
        
        // console.log({ routerQuery: router.query, data })
        // const active = activeFilter.find(filter => filter.id === 1);
        // const index = activeFilter.findIndex(filter => filter.id === 1);

        // const newArray = [...activeFilter];
        // newArray[index] = { id: 1, name: active.name }

        // setActiveFilter(newArray);
        return;
      }

      setActiveFilter([])

      // if (router.query?.orderby === "price" && router.query?.order === "desc") {
      //   const active = activeFilter.find(filter => filter.id === 2);
      //   const index = activeFilter.findIndex(filter => filter.id === 2);

      //   const newArray = [...activeFilter];
      //   newArray[index] = { id: 2, name: active.name };
        
      //   setActiveFilter(newArray)
      // }
    }
    getAsyncData();
  }, [router.query])

  function removeActiveFilter() {
    const params = router.query;
    delete params['attributeId']
    delete params['attributeTerm']
    delete params['attribute']

    router.replace({
      pathname: router.pathname,
      query: {
        ...params
      }
    }, undefined, { shallow: true })
  }

  return {
    activeFilter: activeFilter,
    removeActiveFilter
  }
}

export default useActiveAttributeFilets

// LEGACY ALGORITHM

  // const handleFilterRemove = (filter, router: NextRouter) => {
  //   const params = router.query;

  //   const remainingParams = { ...params }
  //   delete remainingParams[filter];

  //   const { category, ...restParams } = remainingParams;

  //   // if no restParams then should router to category immediately
  //   if (Object.keys(restParams).length === 0) {
  //     router.replace(`/${category}`, undefined, { shallow: true, scroll: true });
  //     return;
  //   }

  //   // Otherwise do some logic
  //   // const example = { filter1: 'delivery', filter2: 'price' }
  //   const paramsArray = Object.keys(restParams)
  //   // console.log({ paramsArray });

  //   let url = `/${category}?`
  //   for (let i = 0; i < paramsArray.length; i++) {
  //     url += `${paramsArray[i]}=${restParams[paramsArray[i]]}${i === paramsArray.length - 1 ? "" : "&"}`
  //   }

  //   router.replace(url, undefined, { shallow: true, scroll: true })
  // }
