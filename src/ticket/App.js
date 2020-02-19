import React, { useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';

import './App.css';
import Header from '../common/Header';
import Nav from '../common/Nav';
import Detail from './components/Detail';
import Candidate from './components/Candidate';
import Schedule from './components/Schedule';

import useNav from '../common/useNav';

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

  const cbs = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, trainNumber, date } = queries;

    const {
      setLeaveDate,
      setLeaveStation,
      setArriveStation,
      setTrainNumber,
      setSearchParsed
    } = cbs;

    // 需要注意的是, 解析出来的都是字符串
    setLeaveDate(h0(dayjs(date).valueOf()));
    setLeaveStation(dStation);
    setArriveStation(aStation);
    setTrainNumber(trainNumber);

    setSearchParsed(true);
  }, [cbs]);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    leaveDate,
    cbs.prevDate,
    cbs.nextDate
  );

  if (!isSearchParsed) return null;

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Header title={trainNumber} handleBack={handleBack} isBackVisible={true} />
      </div>
      <div className='nav-wrapper'>
        <Nav
          date={leaveDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
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
