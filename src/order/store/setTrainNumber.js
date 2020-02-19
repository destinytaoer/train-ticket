import { SET_TRAIN_NUMBER } from './actionTypes';

export function setTrainNumber(trainNumber) {
  return {
    type: SET_TRAIN_NUMBER,
    payload: trainNumber
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TRAIN_NUMBER:
      return { ...state, trainNumber: payload };
    default:
      return state;
  }
}
