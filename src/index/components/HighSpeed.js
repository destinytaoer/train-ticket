import React from 'react';
import PropTypes from 'prop-types';

import './HighSpeed.css'

function HighSpeed(props) {
  const {
    isHighSpeed, toggle
  } = props;
  return (
    <div className="high-speed">
      <div className="high-speed-label">只看高铁/动车</div>
      <div className="high-speed-switch" onClick={() => toggle()}>
        <input type="hidden" name="highSpeed" value={isHighSpeed} />
        <div className={['high-speed-track', isHighSpeed ? 'checked' : ''].filter(Boolean).join(' ')}>
          <span className={['high-speed-handle', isHighSpeed ? 'checked' : ''].filter(Boolean).join(' ')}></span>
        </div>
      </div>
    </div>
  )
}
HighSpeed.propTypes = {
  isHighSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default HighSpeed;