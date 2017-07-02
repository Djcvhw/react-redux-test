import React from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';

import {Main} from './reducers/main';
import fetch from './fetch';
const logger = createLogger();

export default function () {
  return createStore(combineReducers({
    Main
  }), {}, compose(
    applyMiddleware(fetch, logger),
  ));
}
