import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './Menu.css';

const MenuItem = memo(function MenuItem(props) {
  const { title, value, active, handleClick } = props;

  return (
    <li className={active ? 'active' : ''} onClick={() => handleClick(value)}>
      {title}
    </li>
  );
});
MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

const Menu = memo(function Menu(props) {
  const { isVisible, title, options, handleClick, hide } = props;

  return (
    <div>
      {isVisible && <div className='menu-mask' onClick={() => hide()}></div>}
      <div className={['menu', isVisible ? 'show' : ''].filter(Boolean).join(' ')}>
        <div className='menu-title'>{title}</div>
        <ul>
          {options &&
            options.map(option => (
              <MenuItem key={option.value} {...option} handleClick={handleClick} />
            ))}
        </ul>
      </div>
    </div>
  );
});
Menu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  options: PropTypes.array,
  handleClick: PropTypes.func,
  hide: PropTypes.func.isRequired
};

export default Menu;
