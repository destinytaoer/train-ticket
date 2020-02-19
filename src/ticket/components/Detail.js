import React, {memo} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './Detail.css';

function format(d) {
  const date = dayjs(d);

  return date.format('MM-DD') + ' ' + date.locale('zh-cn').format('ddd');
}
const Detail = memo(function Detail(props) {
  const {
    leaveDate,
    arriveDate,
    leaveTime,
    arriveTime,
    leaveStation,
    arriveStation,
    trainNumber,
    durationStr,
    toggle
  } = props;

  const leaveDateStr = format(leaveDate);
  const arriveDateStr = format(arriveDate);

  return (
    <div className='detail'>
      <div className="content">
        <div className="left">
          <p className="city">{leaveStation}</p>
          <p className="time">{leaveTime}</p>
          <p className="date">{leaveDateStr}</p>
        </div>
        <div className="middle">
          <div className="train-name">{trainNumber}</div>
          <p className="train-mid">
            <span className="left"></span>
            <span className="schedule" onClick={() => toggle()}>时刻表</span>
            <span className="right"></span>
          </p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTime}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
      </div>
    </div>
  );
});

Detail.propTypes = {
  leaveDate:PropTypes.number.isRequired,
  arriveDate:PropTypes.number.isRequired,
  leaveTime: PropTypes.string,
  arriveTime: PropTypes.string,
  leaveStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  durationStr: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

export default Detail;
