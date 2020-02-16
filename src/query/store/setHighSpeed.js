import { SET_HIGH_SPEED } from "./actionTypes";

export function setHighSpeed(isHighSpeed) {
  return {
    type: SET_HIGH_SPEED,
    payload: isHighSpeed
  }
}

export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { isHighSpeed } = getState();
    dispatch(setHighSpeed(!isHighSpeed))
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_HIGH_SPEED:
      return { ...state, isHighSpeed: payload };
    default:
      return state;
  }
}
