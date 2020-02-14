import { SET_FROM, SET_TO } from './actionTypes';
import { hideCitySelector } from "./setCitySelectorVisible";

function setFrom(city) {
  return {
    type: SET_FROM,
    payload: city
  }
}

function setTo(city) {
  return {
    type: SET_TO,
    payload: city
  }
}

export function setSelectedCity(city) {
  return (dispatch, getState) => {
    const { isLeftCity } = getState();
    if (isLeftCity) {
      dispatch(setFrom(city));
    } else {
      dispatch(setTo(city))
    }
    dispatch(hideCitySelector());
  }
}

export function exchangeFromTo() {
  return (dispatch, getState) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
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
