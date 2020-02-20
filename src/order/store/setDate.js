import { SET_LEAVE_DATE, SET_ARRIVE_DATE } from './actionTypes';

export function setLeaveDate(date) {
  return {
    type: SET_LEAVE_DATE,
    payload: date
  };
}

export function setArriveDate(date) {
  return {
    type: SET_ARRIVE_DATE,
    payload: date
  };
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEAVE_DATE:
      return { ...state, leaveDate: payload };
    case SET_ARRIVE_DATE:
      return { ...state, arriveDate: payload };
    default:
      return state;
  }
}
