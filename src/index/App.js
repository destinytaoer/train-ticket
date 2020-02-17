import React, {useCallback, useMemo} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from './store/actions';
import './App.css';

import Header from '../common/Header';
import Journey from './components/Journey';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Submit from './components/Submit';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';

function App(props) {
  const { 
    from,
    to,
    isCitySelectorVisible,
    isDateSelectorVisible,
    cityData,
    isCityDataLoading,
    date,
    isHighSpeed,
    dispatch
  } = props;

  const cbs = useMemo(() => {
    // 将 bindActionCreators 放到这里, 防止每次组件重新渲染都重新执行, 生成新的函数导致子组件重新渲染
    return bindActionCreators(actions, dispatch);
  }, [dispatch]); // dispatch 不会改变, 这里使用空数组也可以
  
  const handleBack = useCallback(() => {
    window.history.back();
  }, [])
  
  const handleSelectDate = useCallback((date) => {
    cbs.setDate(date);
    cbs.hideDateSelector();
  }, [cbs]);

  return (
    <div>
      <div className="header-wrapper">
        <Header
          title="火车票"
          isBackVisible={false}
          handleBack={handleBack}
        />
      </div>
      <form action="./query.html" className="form">
        <Journey
          from={from}
          to={to}
          exchangeFromTo={cbs.exchangeFromTo}
          showCitySelector={cbs.showCitySelector}
        />
        <DepartDate time={date} handleClick={cbs.showDateSelector}/>
        <HighSpeed isHighSpeed={isHighSpeed} toggle={cbs.toggleHighSpeed}/>
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        cityData={cityData}
        isLoading={isCityDataLoading}
        handleBack={cbs.hideCitySelector}
        fetchCityData={cbs.fetchCityData}
        handleSelect={cbs.setSelectedCity}
      />
      <DateSelector
        show={isDateSelectorVisible}
        handleBack={cbs.hideDateSelector}
        handleSelect={handleSelectDate}
      />
    </div>
  )
}

export default connect(
  state => { return {...state} },
  dispatch => {return {dispatch}}
)(App);