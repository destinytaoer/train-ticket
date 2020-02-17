import React from 'react';
import PropTypes from 'prop-types';

import './Filter.css';
import { ORDER_DEPART } from '../constants';
function Filter(props) {
  const {
    orderType,
    isHighSpeed,
    hasTicket,
    isFiltersActive,
    toggleOrderType,
    toggleHighSpeed,
    toggleHasTicket,
    toggleFiltersActive
  } = props;

  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span className="item" onClick={() => toggleOrderType()}>
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? '出发 早 → 晚' : '耗时 短 → 长'}
        </span>
        <span className={["item", isHighSpeed ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleHighSpeed()}>
          <i className="icon">{isHighSpeed ? '\uf43f' : '\uf43e'}</i>
          只看高铁/动车
        </span>
        <span className={["item", hasTicket ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleHasTicket()}>
          <i className="icon">{hasTicket ? '\uf43d' : '\uf43c'}</i>
          只看有票
        </span>
        <span className={["item", isFiltersActive ? 'item-on' : ''].filter(Boolean).join(' ')} onClick={() => toggleFiltersActive()}>
          <i className="icon">{'\uf0f7'}</i>
          综合筛选
        </span>
      </div>
    </div>
  );
}
Filter.propTypes = {
  orderType: PropTypes.number.isRequired,
  isHighSpeed: PropTypes.bool.isRequired,
  hasTicket: PropTypes.bool.isRequired,
  isFiltersActive: PropTypes.bool.isRequired,
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleHasTicket: PropTypes.func.isRequired,
  toggleFiltersActive: PropTypes.func.isRequired,
}

export default Filter