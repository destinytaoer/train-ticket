import { SET_FROM, SET_TO } from './actionTypes';

export function setFrom(city) {
  return {
    type: SET_FROM,
    payload: city
  }
}

export function setTo(city) {
  return {
    type: SET_TO,
    payload: city
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FROM:
      return { ...state, from: payload };
    case SET_TO:
      return {...state, to: payload};
    default:
      return state;
  }
}
