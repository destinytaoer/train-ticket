import { SET_CITY_DATA } from './actionTypes';
import { setCityDataLoading } from "./setCityDataLoading";
export function setCityData(cityData) {
  return {
    type: SET_CITY_DATA,
    payload: cityData
  }
}

export function fetchCityData() {
  return (dispatch, getState) => {
    const { isCityDataLoading } = getState();

    if (isCityDataLoading) return;

    dispatch(setCityDataLoading(true));

    // 如果本地存储中有城市列表, 并且时间没有过期, 那么直接从本地存储中获取,不发起请求
    const cache = JSON.parse(localStorage.getItem('city_data_cache') || '{}');

    if (Date.now() < cache.expires) {
      dispatch(setCityData(cache.data));
    }

    fetch('/cities?_' + Date.now())
      .then(res => res.json())
      .then(cityData => {
        dispatch(setCityData(cityData));

        localStorage.setItem(
          'city_data_cache',
          JSON.stringify({
            // 过期时间 15 分钟
            expires: Date.now() +  15 * 60 * 1000,
            data: cityData,
          })
        )

        dispatch(setCityDataLoading(false));
      })
      .catch(() => {
        dispatch(setCityDataLoading(false))
      })
  }
}

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CITY_DATA:
      return { ...state, cityData: payload };
    default:
      return state;
  }
}