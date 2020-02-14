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

function App(props) {
  const { 
    from,
    to,
    dispatch
  } = props;

  const cbs = useMemo(() => {
    // 将 bindActionCreators 放到这里, 防止每次组件重新渲染都重新执行, 生成新的函数导致子组件重新渲染
    return bindActionCreators(actions, dispatch);
  }, [dispatch]); // dispatch 不会改变, 这里使用空数组也可以
  
  const handleBack = useCallback(() => {
    window.history.back();
  },[])

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" handleBack={handleBack} />
      </div>
      <form className="form">
        <Journey
          from={from}
          to={to}
          exchangeFromTo={cbs.exchangeFromTo}
          showCitySelector={cbs.showCitySelector}
        />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>
    </div>
  )
}

export default connect(
  state => { return {...state} },
  dispatch => {return {dispatch}}
)(App);