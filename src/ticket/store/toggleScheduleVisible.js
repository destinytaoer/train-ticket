import { TOGGLE_SCHEDULE_VISIBLE } from './actionTypes';

export function toggleScheduleVisible() {
  return (dispatch, getState) => {
    const { isScheduleVisible } = getState();
    dispatch({
      type: TOGGLE_SCHEDULE_VISIBLE,
      payload: !isScheduleVisible
    });
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_SCHEDULE_VISIBLE:
      return { ...state, isScheduleVisible: payload };
    default:
      return state;
  }
}
