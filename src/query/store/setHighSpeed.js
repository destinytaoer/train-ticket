import { SET_HIGH_SPEED, SET_CHECKED_TRAIN_TYPES } from "./actionTypes";

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
    case SET_CHECKED_TRAIN_TYPES:
      const checkedTrainTypes = payload;
      // 只有两个值, 1 和 5 时, 才是只看高铁
      const isHighSpeed = Boolean(checkedTrainTypes[1] && checkedTrainTypes[5] && Object.keys(checkedTrainTypes).length === 2);
      return { ...state, isHighSpeed };
    default:
      return state;
  }
}
