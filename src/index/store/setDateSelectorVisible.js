import { SET_DATE_SELECTOR_VISIBLE } from './actionTypes';

export function showDateSelector() {
  return {
    type: SET_DATE_SELECTOR_VISIBLE,
    payload: true
  }
}

export function hideDateSelector() {
  return {
    type: SET_DATE_SELECTOR_VISIBLE,
    payload: false
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE_SELECTOR_VISIBLE:
      return { ...state, isDateSelectorVisible: payload };
    default:
      return state;
  }
}