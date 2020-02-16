import React from 'react';
import { connect } from 'react-redux';

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
  state => { return {} },
  dispatch => {return {}}
)(App);