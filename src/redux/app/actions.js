import appActionTypes from './types';

export const setData = (data) => ({
  type: appActionTypes.SET_DATA,
  payload: data,
});

export const setAvailableProducts = (data) => ({
  type: appActionTypes.SET_PRODUCTS,
  payload: data,
});

export const setCart = (data) => ({
  type: appActionTypes.SET_CART,
  payload: data,
});

export const setOrder = (data) => ({
  type: appActionTypes.SET_ORDER,
  payload: data,
});