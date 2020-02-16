import { SET_FILTERS_ACTIVE } from "./actionTypes";

export function setFiltersActive(isFiltersActive) {
  return {
    type: SET_FILTERS_ACTIVE,
    payload: isFiltersActive
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FILTERS_ACTIVE:
      return { ...state, isFiltersActive: payload };
    default:
      return state;
  }
}
