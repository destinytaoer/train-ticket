import { SET_LEAVE_TIME, SET_ARRIVE_TIME } from './actionTypes';

export function setLeaveTime(time) {
  return {
    type: SET_LEAVE_TIME,
    payload: time
  };
}

export function setArriveTime(time) {
  return {
    type: SET_ARRIVE_TIME,
    payload: time
  };
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEAVE_TIME:
      return { ...state, leaveTime: payload };
    case SET_ARRIVE_TIME:
      return { ...state, arriveTime: payload };
    default:
      return state;
  }
}
