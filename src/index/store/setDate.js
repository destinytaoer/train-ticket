import { SET_DATE } from './actionTypes';
export function setDate(date) {
  return {
    type: SET_DATE,
    payload: date
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      return { ...state, date: payload };
    default:
      return state;
  }
}