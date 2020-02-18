import { SET_ARRIVE_STATIONS, SET_CHECKED_ARRIVE_STATION } from "./actionTypes";

export function setArriveStations(arriveStations) {
  return {
    type: SET_ARRIVE_STATIONS,
    payload: arriveStations
  }
}
export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: SET_CHECKED_ARRIVE_STATION,
    payload: checkedArriveStations
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ARRIVE_STATIONS:
      return { ...state, arriveStations: payload };
    case SET_CHECKED_ARRIVE_STATION:
      return { ...state, checkedArriveStations: payload };
    default:
      return state;
  }
}
