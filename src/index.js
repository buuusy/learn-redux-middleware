import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
//import loggerMiddleware from './library/loggerMiddleware.js';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const root = ReactDOM.createRoot(document.getElementById('root'));

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(logger));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
