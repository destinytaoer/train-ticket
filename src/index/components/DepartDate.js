import React, {useMemo} from 'react';
import PropTypes from "prop-types";
import dayjs from 'dayjs';

import { h0 } from '../../common/fp';
import './DepartDate.css';

function DepartDate(props) {
  const { time, handleClick } = props;

  const newTime = h0(time);
  const departDate = useMemo(() => new Date(newTime), [newTime]);

  const isToday = useMemo(() => newTime === h0(), [newTime]);

  const departDateString = useMemo(() => {
    return dayjs(newTime).format('YYYY-MM-DD');
  }, [newTime]);

  const weekString = useMemo(() => '星期' + ['日', '一', '二', '三', '四', '五', '六'][departDate.getDay()] + (isToday ? ' (今天)' : ''), [departDate, isToday]);

  return (
    <div className="depart-date" onClick={handleClick}>
      <input type="hidden" name="date" value={departDateString} />
      <span>{departDateString}</span>
      <span className="depart-week">{weekString}</span>
    </div>
  )
}
DepartDate.propTypes = {
  time: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default DepartDate;