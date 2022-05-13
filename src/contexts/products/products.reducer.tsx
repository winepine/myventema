export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS': 
      return { ...state, products: action.payload }
    // case 'UPDATE_TAGS': 
    //   return { ...state, tags: action.payload }
    // case 'SET_SELECTED_TAGS': 
    //   return { ...state, selectedTags: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
