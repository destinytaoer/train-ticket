import { SET_PRICE } from './actionTypes';

export function setPrice(price) {
  return {
    type: SET_PRICE,
    payload: price
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PRICE:
      return { ...state, price: payload };
    default:
      return state;
  }
}
