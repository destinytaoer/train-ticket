import { setLeaveTime, setArriveTime } from './setTime';
import { setArriveDate } from './setDate';
import { setDurationStr } from './setDurationStr';
import { setPrice } from './setPrice';
export function fetchInitial(url) {
  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { deparTimeStr, arriveTimeStr, arriveDate, durationStr, price } = data;

        dispatch(setLeaveTime(deparTimeStr));
        dispatch(setArriveTime(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}
