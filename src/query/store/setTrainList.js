import { SET_TRAIN_LIST } from "./actionTypes";

export function setTrainList(trainList) {
  return {
    type: SET_TRAIN_LIST,
    payload: trainList
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TRAIN_LIST:
      return { ...state, trainList: payload };
    default:
      return state;
  }
}
