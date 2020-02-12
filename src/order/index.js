import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

// 引入样式文件/store/根组件, 完成 index 的初始化
import store from "./store";
import 'normalize.css/normalize.css'
import './index.css'
import App from 'App.jsx'

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)