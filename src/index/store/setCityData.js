import { SET_CITY_DATA } from './actionTypes';

export function setCityData(cityData) {
  return {
    type: SET_CITY_DATA,
    payload: cityData
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CITY_DATA:
      return { ...state, cityData: payload };
    default:
      return state;
  }
}