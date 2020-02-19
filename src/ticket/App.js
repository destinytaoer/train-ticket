import React, { lazy, Suspense, useEffect, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';

import './App.css';
import Header from '../common/Header';
import Nav from '../common/Nav';
import Detail from '../common/Detail';
import Candidate from './components/Candidate';
// import Schedule from './components/Schedule';

import useNav from '../common/useNav';
import { TrainContext } from './context';

// 异步组件
const Schedule = lazy(() => import('./components/Schedule'));

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

  useEffect(() => {
    if (!isSearchParsed) return;

    const url = new URI('/rest/ticket')
      .setSearch('date', dayjs(leaveDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        const { detail, candidates } = result;

        const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;

        const { setLeaveTime, setArriveTime, setArriveDate, setDurationStr, setTickets } = cbs;

        setLeaveTime(departTimeStr);
        setArriveTime(arriveTimeStr);
        setArriveDate(arriveDate);
        setDurationStr(durationStr);
        setTickets(candidates);
      });
  }, [isSearchParsed, leaveDate, trainNumber, cbs]);

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
      <Nav
        date={leaveDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <Detail
        leaveDate={leaveDate}
        arriveDate={arriveDate}
        leaveTime={leaveTime}
        arriveTime={arriveTime}
        leaveStation={leaveStation}
        arriveStation={arriveStation}
        trainNumber={trainNumber}
        durationStr={durationStr}>
        <span className='left'></span>
        <span className='schedule' onClick={() => cbs.toggleScheduleVisible()}>
          时刻表
        </span>
        <span className='right'></span>
      </Detail>
      <TrainContext.Provider value={{ trainNumber, leaveDate, leaveStation, arriveStation }}>
        <Candidate tickets={tickets} />
      </TrainContext.Provider>
      {isScheduleVisible && (
        <div className='mask' onClick={() => cbs.toggleScheduleVisible()}>
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={leaveDate}
              trainNumber={trainNumber}
              leaveStation={leaveStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
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
