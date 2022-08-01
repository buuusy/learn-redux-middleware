import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
//import loggerMiddleware from './library/loggerMiddleware.js';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules';
import ReduxThunk from 'redux-thunk';

const root = ReactDOM.createRoot(document.getElementById('root'));

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk, sagaMiddleware));
sagaMiddleware.run(rootSaga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
