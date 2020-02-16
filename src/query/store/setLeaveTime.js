import { SET_LEAVE_TIME_START, SET_LEAVE_TIME_END } from "./actionTypes";

export function setLeaveTimeStart(leaveTimeStart) {
  return {
    type: SET_LEAVE_TIME_START,
    payload: leaveTimeStart
  }
}
export function setLeaveTimeEnd(leaveTimeEnd) {
  return {
    type: SET_LEAVE_TIME_END,
    payload: leaveTimeEnd
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LEAVE_TIME_START:
      return { ...state, leaveTimeStart: payload };
    case SET_LEAVE_TIME_END:
      return { ...state, leaveTimeEnd: payload };
    default:
      return state;
  }
}
