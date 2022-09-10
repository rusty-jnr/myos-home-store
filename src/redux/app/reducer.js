import appActionTypes from "./types";

const INITIAL_STATE = {
  products: [],
  cart: [],
  orders: [],
};

function appReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case appActionTypes.SET_DATA:
      return {
        ...state,
        ...payload,
      };
    case appActionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case appActionTypes.SET_CART:
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case appActionTypes.SET_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload],
      };
    default:
      return state;
  }
}

export default appReducer;
