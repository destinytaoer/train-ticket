import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';

import './App.css';
import Header from '../common/Header';
import Account from './components/Account';
import Choose from './components/Choose';
import Passengers from './components/Passengers';
import Ticket from './components/Ticket';

function App(props) {
  const {
    trainNumber,
    leaveStation,
    arriveStation,
    seatType,
    leaveDate,
    arriveDate,
    leaveTime,
    arriveTime,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch
  } = props;

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Header title='订单填写' handleBack={handleBack} isBackVisible={true} />
      </div>
    </div>
  );
}

export default connect(
  state => {
    return { ...state };
  },
  dispatch => {
    return { dispatch };
  }
)(App);
