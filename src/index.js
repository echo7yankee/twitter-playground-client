import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import { App } from './App.jsx';

//jwt
import jwt from 'jsonwebtoken';

//redux
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { logoutUser } from './Redux/actions/auth/auth';
import { SET_AUTHENTICATED } from './Redux/types';
//axios
import axios from 'axios';

axios.defaults.baseURL = 'https://mighty-atoll-48452.herokuapp.com/';

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/dashboard";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common.Authorization = token;
  }
}

const app = <Provider store={store}>
  <App />
</Provider>

ReactDOM.render(app, document.getElementById('root'));
