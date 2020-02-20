import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './Choose.css';

const Seat = memo(function Seat(props) {
  const { seatType, updatePassenger, id, seat } = props;
  return (
    <p
      className={['seat', seat === seatType ? 'active' : ''].filter(Boolean).join(' ')}
      data-text={seatType}
      onClick={() => updatePassenger(id, { seat: seatType })}>
      &#xe02d;
    </p>
  );
});
Seat.propTypes = {
  seatType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  seat: PropTypes.string.isRequired,
  updatePassenger: PropTypes.func.isRequired
};

const Choose = memo(function Choose(props) {
  const { passengers, updatePassenger } = props;

  return (
    <div className='choose'>
      <p className='tip'>在线选座</p>
      <div className='container'>
        {passengers.map(passenger => (
          <div className='seats' key={passenger.id}>
            <div>窗</div>
            <Seat {...passenger} seatType='A' updatePassenger={updatePassenger} />
            <Seat {...passenger} seatType='B' updatePassenger={updatePassenger} />
            <Seat {...passenger} seatType='C' updatePassenger={updatePassenger} />
            <div>过道</div>
            <Seat {...passenger} seatType='D' updatePassenger={updatePassenger} />
            <Seat {...passenger} seatType='F' updatePassenger={updatePassenger} />
            <div>窗</div>
          </div>
        ))}
      </div>
    </div>
  );
});
Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired
};

export default Choose;
