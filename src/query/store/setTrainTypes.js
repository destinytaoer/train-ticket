import { SET_TRAIN_TYPES, SET_CHECKED_TRAIN_TYPES } from "./actionTypes";

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
    case SET_CHECKED_TRAIN_TYPES:
      return { ...state, checkedTrainTypes: payload };
    default:
      return state;
  }
}
