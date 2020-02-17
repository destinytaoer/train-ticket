import { SET_ORDER_TYPE } from "./actionTypes";
import { ORDER_DEPART, ORDER_DURATION } from '../constants';

export function toggleOrderType() {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: SET_ORDER_TYPE,
        payload: ORDER_DURATION
      })
    } else {
      dispatch({
        type: SET_ORDER_TYPE,
        payload: ORDER_DEPART
      })
    }
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ORDER_TYPE:
      return { ...state, orderType: payload };
    default:
      return state;
  }
}
