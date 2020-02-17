import React from 'react';
import PropTypes from 'prop-types';
import './Header.css'

function Header(props) {
  const { title, isBackVisible=true, handleBack } = props;
  return (
    <div className="header">
      {
        isBackVisible ?
          <div className="header-back" onClick={handleBack}>
            <svg width="42" height="42">
              <polyline
                points="25,13 16,21 25,29"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          : null
      }
      
      <h1 className="header-title">
        {title}
      </h1>
    </div>
  )
}

Header.propTypes = {
  handleBack: PropTypes.func.isRequired,
  isBackVisible: PropTypes.bool,
  title: PropTypes.string.isRequired
}

export default Header;