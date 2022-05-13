export const reducer = (state, action) => {
  switch (action.type) {
    case 'APPEND_TAG': 
      return { ...state, selectedTags: [...state.selectedTags, action.payload] }
    case 'UPDATE_TAGS': 
      return { ...state, tags: action.payload }
    case 'SET_SELECTED_TAGS': 
      return { ...state, selectedTags: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
