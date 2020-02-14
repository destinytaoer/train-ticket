import React from 'react';
import PropTypes from 'prop-types';
import switchImg from './imgs/switch.svg'
import './Journey.css';

function Journey(props) {
  const { 
    from,
    to,
    exchangeFromTo,
    showCitySelector
   } = props;
  return (
    <div className="journey">
      <div
        className="journey-station"
        onClick={() => showCitySelector(true)}
      >
        <input
          type="text"
          readOnly
          name="from"
          className="journey-input journey-from"
          value={from}
        />
      </div>
      <div className="journey-switch" onClick={exchangeFromTo}>
        <img src={switchImg} width="70" height="40" alt="switch"/>
      </div>
      <div
        className="journey-station"
        onClick={() => showCitySelector(false)}
      >
        <input
          type="text"
          readOnly
          name="to"
          className="journey-input journey-to"
          value={to}
        />
      </div>
    </div>
  )
}

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exchangeFromTo: PropTypes.func.isRequired,
  showCitySelector: PropTypes.func.isRequired
}

export default Journey;