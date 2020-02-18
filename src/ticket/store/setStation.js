import { SET_LEAVE_STATION, SET_ARRIVE_STATION } from './actionTypes';

export function setLeaveStation(station) {
  return {
    type: SET_LEAVE_STATION,
    payload: station
  };
}

export function setArriveStation(station) {
  return {
    type: SET_ARRIVE_STATION,
    payload: station
  };
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEAVE_STATION:
      return { ...state, leaveStation: payload };
    case SET_ARRIVE_STATION:
      return { ...state, arriveStation: payload };
    default:
      return state;
  }
}
