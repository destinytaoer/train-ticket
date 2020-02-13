import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import 'normalize.css/normalize.css'

// 引入样式文件/store/根组件, 完成 index 的初始化
import store from "./store";
import './index.css'
import App from './App'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)