import { SET_CITY_DATA_LOADING } from './actionTypes';

export function setCityDataLoading(isCityDataLoading) {
  return {
    type: SET_CITY_DATA_LOADING,
    payload: isCityDataLoading
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CITY_DATA_LOADING:
      return { ...state, isCityDataLoading: payload };
    default:
      return state;
  }
}