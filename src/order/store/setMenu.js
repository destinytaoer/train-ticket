import { SET_MENU } from './actionTypes';

export function setMenu(menu) {
  return {
    type: SET_MENU,
    payload: menu
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MENU:
      return { ...state, menu: payload };
    default:
      return state;
  }
}
