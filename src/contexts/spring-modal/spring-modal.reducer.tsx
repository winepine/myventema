export const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_MODAL': 
      return { ...state, isOpen: action.payload }
    case 'CLOSE_MODAL': 
      return { ...state, isOpen: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
