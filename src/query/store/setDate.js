import { SET_DATE } from "./actionTypes";
import {h0} from '../../common/fp'

export function setDate(city) {
  return {
    type: SET_DATE,
    payload: city
  }
}

export function nextDate() {
  return (dispatch, getState) => {
    const { date } = getState();
    dispatch(setDate(h0(date) + 86400 * 1000))
  }
}

export function prevDate() {
  return (dispatch, getState) => {
    const { date } = getState();
    dispatch(setDate(h0(date) - 86400 * 1000))
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATE:
      return { ...state, city: payload };
    default:
      return state;
  }
}
