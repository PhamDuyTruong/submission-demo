import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
// Set up store
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from './reducers'

const composeEnhancers =  compose;

// Tạo store từ reducer
const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
