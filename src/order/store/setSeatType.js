import { SET_SEAT_TYPE } from './actionTypes';

export function setSeatType(seatType) {
  return {
    type: SET_SEAT_TYPE,
    payload: seatType
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEAT_TYPE:
      return { ...state, seatType: payload };
    default:
      return state;
  }
}
