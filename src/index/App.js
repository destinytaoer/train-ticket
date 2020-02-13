import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import Journey from './components/Journey';
import DepartDate from './components/DepartDate';
import HighSpeed from './components/HighSpeed';
import Submit from './components/Submit';

function App(props) {
  return (
    <div>
      <Header />
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

export default connect(
  state => { return {} },
  dispatch => {return {}}
)(App);