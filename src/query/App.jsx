import {connect} from 'react-redux'

import './App.css';
import actions from './store/actions'

function App(props) {
  
}

export default connect(
  state => ({...state}),
  actions
)(App);