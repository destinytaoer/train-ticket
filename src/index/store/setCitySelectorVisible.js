import { SET_CITY_SELECTOR_VISIBLE, SET_IS_LEFT_CITY } from './actionTypes';

export function showCitySelector(isLeftCity) {
  return (dispatch) => {
    dispatch({
      type: SET_CITY_SELECTOR_VISIBLE,
      payload: true
    });
    dispatch({
      type: SET_IS_LEFT_CITY,
      payload: isLeftCity
    })
  }
}
export function hideCitySelector() {
  return {
    type: SET_CITY_SELECTOR_VISIBLE,
    payload: false
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CITY_SELECTOR_VISIBLE:
      return { ...state, isCitySelectorVisible: payload };
    case SET_IS_LEFT_CITY:
      return { ...state, isLeftCity: payload };
    default:
      return state;
  }
}