export const initialState = {
  searchTerm: '',
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isSidebarShow: false,
  isCheckoutCartShow: false,
};

type ActionType =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_STICKY' }
  | { type: 'REMOVE_STICKY' }
  | { type: 'SET_SIDEBAR_STICKY' }
  | { type: 'REMOVE_SIDEBAR_STICKY' }
  // | { type: 'IS_SIDEBAR_SHOW'; payload: boolean }
  | { type: 'IS_SIDEBAR_SHOW'; payload: boolean }
  | { type: 'IS_CHECKOUT_CART_SHOW'; payload: boolean }
  | { type: 'TOGGLE_DRAWER' };

type StateType = typeof initialState;

export function appReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      };
    case 'SET_STICKY':
      return {
        ...state,
        isSticky: true,
      };
    case 'REMOVE_STICKY':
      return {
        ...state,
        isSticky: false,
      };
    case 'SET_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: true,
      };
    case 'REMOVE_SIDEBAR_STICKY':
      return {
        ...state,
        isSidebarSticky: false,
      };
    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case 'IS_SIDEBAR_SHOW':
      return {
        ...state,
        isSidebarShow: action.payload,
      };
    case 'IS_CHECKOUT_CART_SHOW':
      return {
        ...state,
        isCheckoutCartShow: action.payload,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
