import { useRouter } from 'next/router';
import React, { useReducer, useContext, createContext, useEffect, useState } from 'react';
import { reducer } from './tags.reducer';
import _ from 'lodash';
import axios from 'axios';
import { useQuery } from 'react-query'

const DEFAULT_TAGS = [
  {
    id: 19,
    name: "Buy",
    slug: "buy",
    count: 2
  },
  {
    id: 20,
    name: "Rent",
    slug: "rent",
    count: 2
  }
]

const TagsContext = createContext({} as any);
const INITIAL_STATE = {
  selectedTags: [],
  tags: []
};

const useTagsActions = (initialTagsState = INITIAL_STATE) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialTagsState);
  const [tagsFromJSON, setTagsFromJSON] = useState([]);
  const [loading, setLoading] = useState(true)
  const [defaultTagsFromJSON, setDefaultTagsFromJSON] = useState([]);

  // useEffects
  useEffect(() => {
    if (state?.selectedTags?.length === 0) {
      const defaultTags = DEFAULT_TAGS;

      dispatch({ type: 'UPDATE_TAGS', payload: defaultTagsFromJSON });
    }
  }, [state.selectedTags, defaultTagsFromJSON])

   // useEffect(() => {
  //   async function getAsyncData() {
  //     const { data } = await axios.get("api/tags");
  //     console.log({ data });

  //     // filter 2 tags for displaying on first look
  //     const defaultTags = await data?.products.filter(item => item.name === "Πρόσωπο" || item.name === "Σώμα");
  //     console.log({ defaultTags });
  //     setDefaultTagsFromJSON(defaultTags);


  //     setTagsFromJSON(data?.products || []);
  //     setLoading(false);
  //   }
  //   getAsyncData();
  // }, [])

  /*
    HANDLERS
  */
  const onSetTags = async (tags: any[]) => {
    console.log('/use-tags', { tags });
    setTagsFromJSON(tags || []);
    
      // filter 2 tags for displaying on first look
      const defaultTags = tags.filter(item => item.name === "Πρόσωπο" || item.name === "Σώμα");
      setDefaultTagsFromJSON(defaultTags);


      setLoading(false);
  }

  const handleAppendTag = (tag) => {
    dispatch({ type: 'APPEND_TAG', payload: tag })
  }

  const handleSetSelectedTags = (tags) => {
    dispatch({ type: 'SET_SELECTED_TAGS', payload: tags });
  }

  const handleExtractTagsFromProducts = (products) => {
    const tags = [];
  
    for (const product of products) {
      tags.push(...product.tags);
    }
    
    const uniqTags = _.uniqBy(tags, 'id');    
    const restTags = _.differenceBy(uniqTags, state.selectedTags, 'id');

    const restTagsWithAllValues = _.intersectionBy(tagsFromJSON, restTags, 'id');
    // console.log({ tags, uniqTags, restTags, restTagsWithAllValues });

    dispatch({ type: 'UPDATE_TAGS', payload: restTagsWithAllValues })
  }

  return {
    state,
    isTagsLoading: loading,
    onSetTags,
    handleAppendTag,
    handleExtractTagsFromProducts,
    handleSetSelectedTags,
  };
};

export const TagsProvider = ({ children }) => {
  const {
    state,
    isTagsLoading,
    onSetTags,
    handleAppendTag,
    handleExtractTagsFromProducts,
    handleSetSelectedTags
  } = useTagsActions();

  return (
    <TagsContext.Provider
      value={{
        selectedTags: state.selectedTags,
        tags: state.tags,
        isTagsLoading,
        onSetTags,
        onAppendTag: handleAppendTag,
        onExtractTagsFromProducts: handleExtractTagsFromProducts,
        onSetSelectedTags: handleSetSelectedTags,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => useContext(TagsContext);
