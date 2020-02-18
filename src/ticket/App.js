import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';

import './App.css';
import Detail from './components/Detail';
import Candidate from './components/Candidate';
import Schedule from './components/Schedule';

function App(props) {
  const {
    leaveDate,
    arriveDate,
    leaveTime,
    arriveTime,
    leaveStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    isSearchParsed,
    dispatch
  } = props;

  return <div>ticket</div>;
}

export default connect(
  state => {
    return { ...state };
  },
  dispatch => {
    return { dispatch };
  }
)(App);
