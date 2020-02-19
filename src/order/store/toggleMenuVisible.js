import { TOGGLE_MENU_VISIBLE } from './actionTypes';

export function toggleMenuVisible() {
  return (dispatch, getState) => {
    const { isMenuVisible } = getState();
    dispatch({
      type: TOGGLE_MENU_VISIBLE,
      payload: !isMenuVisible
    });
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_MENU_VISIBLE:
      return { ...state, isMenuVisible: payload };
    default:
      return state;
  }
}
