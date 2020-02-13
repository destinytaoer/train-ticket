import { TOGGLE_HIGH_SPEED } from './actionTypes';

export function toggleHighSpeed(isHighSpeed) {
  return (dispatch, getState) => {
    const { isHighSpeed } = getState();
    dispatch({
      type: TOGGLE_HIGH_SPEED,
      payload: !isHighSpeed
    });
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_HIGH_SPEED:
      return { ...state, isHighSpeed: payload };
    default:
      return state;
  }
}