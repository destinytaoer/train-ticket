import { SET_LEAVE_STATIONS, SET_CHECKED_LEAVE_STATIONS } from "./actionTypes";

export function setLeaveStations(leaveStations) {
  return {
    type: SET_LEAVE_STATIONS,
    payload: leaveStations
  }
}
export function setCheckedLeaveStations(checkedLeaveStations) {
  return {
    type: SET_CHECKED_LEAVE_STATIONS,
    payload: checkedLeaveStations
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEAVE_STATIONS:
      return { ...state, leaveStations: payload };
    case SET_CHECKED_LEAVE_STATIONS:
      return { ...state, checkedLeaveStations: payload };
    default:
      return state;
  }
}
