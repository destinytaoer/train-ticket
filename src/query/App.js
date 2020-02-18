import React, {useCallback, useEffect, useMemo} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from './store/actions';
import URI from "urijs";
import dayjs from 'dayjs';
import {h0} from '../common/fp';

import './App.css';
import Header from '../common/Header';
import Nav from '../common/Nav';
import useNav from '../common/useNav';
import List from './components/List';
import Filter from './components/Filter';

function App(props) {
  const {
    from,
    to,
    date,
    isHighSpeed,
    isSearchParsed,
    orderType,
    hasTicket,
    ticketTypes,
    trainTypes,
    leaveStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedLeaveStations,
    checkedArriveStations,
    leaveTimeStart,
    leaveTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    trainList,
    isFiltersActive,
    dispatch
  } = props;

  const cbs = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, [dispatch]);

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { from, to, date, highSpeed } = queries;
    const { setFrom, setTo, setDate, setHighSpeed, setSearchParsed } = cbs;

    // 需要注意的是, 解析出来的都是字符串
    setFrom(from);
    setTo(to);
    setDate(h0(dayjs(date).valueOf()));
    setHighSpeed(highSpeed === 'true');

    setSearchParsed(true);
  }, [cbs]);

  useEffect(() => {
    if (!isSearchParsed) return;
    // 只有当问号参数解析完成后, 才进行数据请求

    const url = new URI('/rest/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
      .setSearch('highSpeed', isHighSpeed)
      .search('orderType', orderType)
      .search('hasTicket', hasTicket)
      .search('isSearchParsed', isSearchParsed)
      .search('checkedTicketTypes', Object.keys(checkedTicketTypes).join())
      .search('checkedTrainTypes', Object.keys(checkedTrainTypes).join())
      .search('checkedLeaveStations', Object.keys(checkedLeaveStations).join())
      .search('checkedArriveStation', Object.keys(checkedArriveStations).join())
      .search('leaveTimeStart', leaveTimeStart)
      .search('leaveTimeEnd', leaveTimeEnd)
      .search('arriveTimeStart', arriveTimeStart)
      .search('arriveTimeEnd', arriveTimeEnd)
      .toString();
    
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        } = result;

        const { setTrainList, setTicketTypes, setTrainTypes, setLeaveStations, setArriveStations } = cbs;
        setTrainList(trains);
        setTicketTypes(ticketType);
        setTrainTypes(trainType);
        setLeaveStations(depStation);
        setArriveStations(arrStation);
      })
  }, [
    from,
    to,
    date,
    isHighSpeed,
    orderType,
    hasTicket,
    isSearchParsed,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedLeaveStations,
    checkedArriveStations,
    leaveTimeStart,
    leaveTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
    cbs
  ])

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(date, cbs.prevDate, cbs.nextDate);

  const filterCbs = useMemo(() => {
    const {
      toggleOrderType,
      toggleHighSpeed,
      toggleHasTicket,
      toggleFiltersActive,
      setCheckedTicketTypes,
      setCheckedTrainTypes,
      setCheckedLeaveStations,
      setCheckedArriveStations,
      setLeaveTimeStart,
      setLeaveTimeEnd,
      setArriveTimeStart,
      setArriveTimeEnd,
    } = cbs;

    return {
      toggleOrderType,
      toggleHighSpeed,
      toggleHasTicket,
      toggleFiltersActive,
      setCheckedTicketTypes,
      setCheckedTrainTypes,
      setCheckedLeaveStations,
      setCheckedArriveStations,
      setLeaveTimeStart,
      setLeaveTimeEnd,
      setArriveTimeStart,
      setArriveTimeEnd,
    }
  }, [cbs]);

  if (!isSearchParsed) {
    return null;
  }

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} → ${to}`} handleBack={handleBack}/>
      </div>
      <Nav
        date={date}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <List
        list={trainList}
      />
      <Filter
        orderType={orderType}
        isHighSpeed={isHighSpeed}
        hasTicket={hasTicket}
        isFiltersActive={isFiltersActive}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        leaveStations={leaveStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedLeaveStations={checkedLeaveStations}
        checkedArriveStations={checkedArriveStations}
        leaveTimeStart={leaveTimeStart}
        leaveTimeEnd={leaveTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...filterCbs}
      />
    </div>
  )
}

export default connect(
  state => { return {...state} },
  dispatch => { return {dispatch} }
)(App);