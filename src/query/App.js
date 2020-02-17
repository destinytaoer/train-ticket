import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from './store/actions';

import './App.css';
import Nav from '../common/Nav';
import List from './components/List';
import Filter from './components/Filter';

function App(props) {
  return (
    <div>
      <Nav />
      <List />
      <Filter />
    </div>
  )
}

export default connect(
  state => { return {...state} },
  dispatch => { return {dispatch} }
)(App);