import { SET_ARRIVE_TIME_START, SET_ARRIVE_TIME_END } from "./actionTypes";

export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: SET_ARRIVE_TIME_START,
    payload: arriveTimeStart
  }
}
export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: SET_ARRIVE_TIME_END,
    payload: arriveTimeEnd
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ARRIVE_TIME_START:
      return { ...state, arriveTimeStart: payload };
    case SET_ARRIVE_TIME_END:
      return { ...state, arriveTimeEnd: payload };
    default:
      return state;
  }
}
