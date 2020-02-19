import { SET_PASSENGERS } from './actionTypes';

export function setPassengers(passengers) {
  return {
    type: SET_PASSENGERS,
    payload: passengers
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_PASSENGERS:
      return { ...state, passengers: payload };
    default:
      return state;
  }
}
