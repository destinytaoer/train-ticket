import React from 'react';
import { connect } from 'react-redux';
import './App.css';

function App(props) {
  return <div>query</div>
}

export default connect(
  state => { return {} },
  dispatch => {return {}}
)(App);