import { setLeaveTime, setArriveTime } from './setTime';
import { setArriveDate } from './setDate';
import { setDurationStr } from './setDurationStr';
import { setPrice } from './setPrice';
export function fetchInitial(url) {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { departTimeStr, arriveTimeStr, arriveDate, durationStr, price } = data;

        dispatch(setLeaveTime(departTimeStr));
        dispatch(setArriveTime(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}
