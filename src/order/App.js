import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './store/actions';
import URI from 'urijs';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';

import './App.css';
import Header from '../common/Header';
import Detail from '../common/Detail';
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
    isSearchParsed,
    dispatch
  } = props;

  const cbs = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { trainNumber, leaveStation, arriveStation, type, date } = queries;

    const {
      setTrainNumber,
      setLeaveStation,
      setArriveStation,
      setSeatType,
      setLeaveDate,
      setSearchParsed
    } = cbs;

    setTrainNumber(trainNumber);
    setLeaveStation(leaveStation);
    setArriveStation(arriveStation);
    setSeatType(type);
    setLeaveDate(h0(dayjs(date).valueOf()));

    setSearchParsed(true);
  }, [cbs]);

  useEffect(() => {
    if (!isSearchParsed) return;

    const url = new URI('/rest/order')
      .setSearch('dStation', leaveStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(leaveDate).format('YYYY-MM-DD'))
      .toString();

    cbs.fetchInitial(url);
  }, [isSearchParsed, leaveStation, arriveStation, seatType, leaveDate, cbs]);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  if (!isSearchParsed) return null;

  return (
    <div className='app'>
      <div className='header-wrapper'>
        <Header title='订单填写' handleBack={handleBack} isBackVisible={true} />
      </div>
      <Detail
        leaveDate={leaveDate}
        arriveDate={arriveDate}
        leaveTime={leaveTime}
        arriveTime={arriveTime}
        leaveStation={leaveStation}
        arriveStation={arriveStation}
        trainNumber={trainNumber}
        durationStr={durationStr}>
        <span style={{ display: 'block' }} className='train-icon'></span>
      </Detail>
      <Ticket price={price} type={seatType} />
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
