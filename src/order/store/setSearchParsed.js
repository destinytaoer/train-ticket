import { SET_SEARCH_PARSED } from './actionTypes';

export function setSearchParsed() {
  return {
    type: SET_SEARCH_PARSED,
    payload: true
  };
}

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_PARSED:
      return { ...state, isSearchParsed: payload };
    default:
      return state;
  }
}
