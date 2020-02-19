import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';

import './App.css';

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
  return <div>order</div>;
}

export default connect(
  state => {
    return { ...state };
  },
  dispatch => {
    return { dispatch };
  }
)(App);
