import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import { h0 } from './fp';
import Header from './Header';
import './DateSelector.css';

function Day(props) {
  const { day, handleSelect } = props;

  const dayStr = useMemo(() => {
    const now = h0();

    return now === day ? '今天' : new Date(day).getDate();
  }, [day]);

  if (!day) {
    return <td className="null"></td>
  }

  const now = h0();
  let isWeekend = [6, 0].includes(new Date(day).getDay());

  if (day < now) {
    return <td className={['disabled', isWeekend ? 'weekend': ''].filter(Boolean).join(' ')}>{dayStr}</td>
  }

  return (
    <td onClick={() => handleSelect(day)} className={isWeekend ? 'weekend': ''}>{dayStr}</td>
  )
}
Day.propTypes = {
  day: PropTypes.number,
  handleSelect: PropTypes.func.isRequired,
}

function Week(props) {
  const {
    days, handleSelect
  } = props;

  return (
    <tr className="date-table-days">
      {
        days.map((day, index) => <Day key={index} day={day} handleSelect={handleSelect}/>)
      }
    </tr>
  )
}
Week.propTypes = {
  days: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

function Month(props) {
  const { startingTimeInMonth, handleSelect } = props;

  const startDay = new Date(startingTimeInMonth);
  
  const weeks = useMemo(() => {
    const startDay = new Date(startingTimeInMonth);
    const currentDay = new Date(startingTimeInMonth);
    
    // 获取当月所有日期
    let days = [];
    while (currentDay.getMonth() === startDay.getMonth()) {
      days.push(currentDay.getTime());
      currentDay.setDate(currentDay.getDate() + 1);
    }

    // 补齐前后空缺
    days = new Array(startDay.getDay())
      .fill(null).concat(days);
    const lastDay = new Date(days[days.length - 1]);
    days = days.concat(new Array(6 - lastDay.getDay()).fill(null));

    // 所有日期按周分组
    let weeks = [];
    for (let row = 0; row < days.length / 7; row++) {
      const week = days.slice(row * 7, (row + 1) * 7);
      weeks.push(week);
    }

    return weeks;
  }, [startingTimeInMonth]);
  

  return (
    <table className="date-table">
      <thead>
        <tr><td colSpan="7">
          <h5>{`${startDay.getFullYear()}年${startDay.getMonth() + 1}月`}</h5>
        </td></tr>
      </thead>
      <tbody>
        <tr className="date-table-weeks">
          <th className="weekend">周日</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th className="weekend">周六</th>
        </tr>
        {
          weeks.map((week, index) => <Week key={index} days={week} handleSelect={handleSelect} />
          )
        }
      </tbody>
    </table>
  )
}
Month.propTypes = {
  startingTimeInMonth: PropTypes.number.isRequired,
  handleSelect: PropTypes.func.isRequired,
}

function DateSelector(props) {
  const {
    show, handleSelect, handleBack
  } = props;

  // 获取最近三个月的开始事件戳
  const monthSequence = useMemo(() => {
    let now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(1);

    let monthSequence = [];
    
    monthSequence.push(now.getTime());
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());
    now.setMonth(now.getMonth() + 1);
    monthSequence.push(now.getTime());

    return monthSequence;
  }, []);

  return (
    <div className={['date-selector', !show ? 'hidden' : ''].filter(Boolean).join(' ')}>
      <Header title="日期选择" handleBack={handleBack} isBackVisible={true} />
      <div className="date-selector-tables">
        {
          monthSequence.map(month => {
            return <Month key={month} startingTimeInMonth={month} handleSelect={handleSelect}/>
          })
        }
      </div>
    </div>
  )
}
DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
}

export default DateSelector;