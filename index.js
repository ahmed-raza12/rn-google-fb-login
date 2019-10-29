/** @format */

import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import App from './App';
import { name as appName } from './app.json';
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import allReducers from './src//store/reducer'
import firebase from '@firebase/app'

// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "patient-tracker-d313c.firebaseapp.com",
  databaseURL: "https://patient-tracker-d313c.firebaseio.com",
  projectId: "patient-tracker-d313c",
  storageBucket: "patient-tracker-d313c.appspot.com",
  messagingSenderId: ""
};
firebase.initializeApp(config);
import Signin from './src/authComp/signin';

const store = createStore(
  allReducers,
  {},
  applyMiddleware(thunk)
)

class MainApplication extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
AppRegistry.registerComponent(appName, () => MainApplication);