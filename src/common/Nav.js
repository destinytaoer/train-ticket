import React, {useMemo, memo} from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import './Nav.css';

const Nav = memo(function Nav(props) {
  const {
    date,
    prev,
    next,
    isPrevDisabled,
    isNextDisabled
  } = props;

  const currentString = useMemo(() => {
    const d = dayjs(date);
    return d.format('M 月 D 日 ') + d.locale('zh-cn').format('ddd')
  }, [date]);

  return (
    <div className="nav">
      <span
        onClick={() => prev()}
        className={['nav-prev', isPrevDisabled ? 'nav-disabled' : ''].filter(Boolean).join(' ')}
      >前一天</span>
      <span className="nav-current">{currentString}</span>
      <span
        onClick={() => next()}
        className={['nav-next', isNextDisabled ? 'nav-disabled' : ''].filter(Boolean).join(' ')}
      >后一天</span>
    </div>
  );
});
Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next:PropTypes.func.isRequired,
  isPrevDisabled:PropTypes.bool.isRequired,
  isNextDisabled:PropTypes.bool.isRequired
}

export default Nav