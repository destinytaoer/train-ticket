import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import './Account.css';

const Account = memo(function Account(props) {
  const { price, length } = props;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className='account'>
      <div
        className={['price', expanded ? 'expanded' : ''].filter(Boolean).join(' ')}
        onClick={() => setExpanded(!expanded)}>
        <div className='money'>{length * price}</div>
        <div className='amount'>支付金额</div>
      </div>
      <div className='button'>提交订单</div>
      <div
        className={['layer', expanded ? '' : 'hidden'].filter(Boolean).join(' ')}
        onClick={() => setExpanded(false)}></div>
      <div
        className={['detail', expanded ? '' : 'hidden'].filter(Boolean).join(' ')}
        onClick={() => setExpanded(false)}>
        <div className='title'>金额详情</div>
        <ul>
          {length > 0 ? (
            <li>
              <span>火车票</span>
              <span>${price}</span>
              <span>&#xD7;{length}</span>
            </li>
          ) : (
            <li>
              <span>无</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
});
Account.propTypes = {
  price: PropTypes.number,
  length: PropTypes.number.isRequired
};

export default Account;
