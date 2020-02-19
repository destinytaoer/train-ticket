import { SET_DURATION_STR } from './actionTypes';

export function setDurationStr(durationStr) {
  return {
    type: SET_DURATION_STR,
    payload: durationStr
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_DURATION_STR:
      return { ...state, durationStr: payload };
    default:
      return state;
  }
}
