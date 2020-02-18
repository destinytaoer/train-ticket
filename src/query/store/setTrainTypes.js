import { SET_TRAIN_TYPES, SET_CHECKED_TRAIN_TYPES, SET_HIGH_SPEED } from "./actionTypes";

export function setTrainTypes(trainTypes) {
  return {
    type: SET_TRAIN_TYPES,
    payload: trainTypes
  }
}
export function setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TRAIN_TYPES:
      return { ...state, trainTypes: payload };
    case SET_HIGH_SPEED:
      const isHighSpeed = payload;
      const newCheckedTrainTypes = { ...state.checkedTrainTypes };
      if (isHighSpeed) {
        newCheckedTrainTypes[1] = true;
        newCheckedTrainTypes[5] = true;
      } else {
        delete newCheckedTrainTypes[1];
        delete newCheckedTrainTypes[5];
      }
      return { ...state, checkedTrainTypes: newCheckedTrainTypes };
    case SET_CHECKED_TRAIN_TYPES:
      return { ...state, checkedTrainTypes: payload };
    default:
      return state;
  }
}
