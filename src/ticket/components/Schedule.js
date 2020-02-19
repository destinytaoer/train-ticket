import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import leftPad from 'left-pad';
import URI from 'urijs';
import dayjs from 'dayjs';

import './Schedule.css';

const ScheduleRow = memo(function ScheduleRow(props) {
  const {
    index,
    station,
    arriveTime,
    leaveTime,
    stay,
    isStartStation,
    isEndStation,
    isLeaveStation,
    isArriveStation,
    beforeLeaveStation,
    afterArriveStation
  } = props;

  return (
    <li>
      <div
        className={['icon', isLeaveStation || isArriveStation ? 'icon-red' : '']
          .filter(Boolean)
          .join(' ')}>
        {isLeaveStation ? '出' : isArriveStation ? '到' : leftPad(index, 2, 0)}
      </div>
      <div
        className={['row', beforeLeaveStation || afterArriveStation ? 'grey' : '']
          .filter(Boolean)
          .join(' ')}>
        <span
          className={['station', isArriveStation || isLeaveStation ? 'red' : '']
            .filter(Boolean)
            .join(' ')}>
          {station}
        </span>
        <span className={['arrtime', isArriveStation ? 'red' : ''].filter(Boolean).join(' ')}>
          {isStartStation ? '始发站' : arriveTime}
        </span>
        <span className={['deptime', isLeaveStation ? 'red' : ''].filter(Boolean).join(' ')}>
          {isEndStation ? ' 终到站' : leaveTime}
        </span>
        <span className='stoptime'>{isStartStation || isEndStation ? '-' : stay + '分'}</span>
      </div>
    </li>
  );
});
ScheduleRow.propTypes = {
  index: PropTypes.number.isRequired,
  station: PropTypes.string.isRequired,
  arriveTime: PropTypes.string,
  leaveTime: PropTypes.string,
  stay: PropTypes.number,
  isStartStation: PropTypes.bool.isRequired,
  isEndStation: PropTypes.bool.isRequired,
  isLeaveStation: PropTypes.bool.isRequired,
  isArriveStation: PropTypes.bool.isRequired,
  beforeLeaveStation: PropTypes.bool.isRequired,
  afterArriveStation: PropTypes.bool.isRequired
};
function Schedule(props) {
  const { date, trainNumber, leaveStation, arriveStation } = props;

  const [scheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    const url = new URI('/rest/schedule')
      .setSearch('trainNumber', trainNumber)
      .setSearch('departStaion', leaveStation)
      .setSearch('arriveStation', arriveStation)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(data => {
        let leaveRow;
        let arriveRow;
        for (let i = 0; i < data.length; i++) {
          if (!leaveRow) {
            if (data[i].station === leaveStation) {
              leaveRow = Object.assign(data[i], {
                beforeLeaveStation: false,
                isLeaveStation: true,
                afterArriveStation: false,
                isArriveStation: false
              });
            } else {
              Object.assign(data[i], {
                beforeLeaveStation: true,
                isLeaveStation: false,
                afterArriveStation: false,
                isArriveStation: false
              });
            }
          } else if (!arriveRow) {
            if (data[i].station === arriveStation) {
              arriveRow = Object.assign(data[i], {
                beforeLeaveStation: false,
                isLeaveStation: false,
                afterArriveStation: false,
                isArriveStation: true
              });
            } else {
              Object.assign(data[i], {
                beforeLeaveStation: false,
                isLeaveStation: false,
                afterArriveStation: false,
                isArriveStation: false
              });
            }
          } else {
            Object.assign(data[i], {
              beforeLeaveStation: false,
              isLeaveStation: false,
              afterArriveStation: true,
              isArriveStation: false
            });
          }

          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
            leaveTime: data[i].departTime
          });
        }
        setScheduleList(data);
      });
  }, [date, trainNumber, leaveStation, arriveStation]);

  return (
    <div className='schedule'>
      <div className='dialog'>
        <h1>列车时刻表</h1>
        <div className='head'>
          <span className='station'>车站</span>
          <span className='deptime'>到达</span>
          <span className='arrtime'>发车</span>
          <span className='stoptime'>停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule, index) => {
            return <ScheduleRow index={index + 1} key={schedule.station} {...schedule} />;
          })}
        </ul>
      </div>
    </div>
  );
}
Schedule.propTypes = {
  date: PropTypes.number.isRequired,
  trainNumber: PropTypes.string.isRequired,
  leaveStation: PropTypes.string.isRequired,
  arriveStation: PropTypes.string.isRequired
};

export default Schedule;
