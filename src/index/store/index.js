import { createStore, applyMiddleware, compose } from "redux";

import reducer from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENDTION_COMPOSE__ || compose;
export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
)