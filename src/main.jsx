import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import {thunk} from 'redux-thunk'
import rootReducer from './reducers'
import { getAllProducts } from './actions'
import App from './App'
import ReactDOM from 'react-dom/client';


const middleware = [ thunk ];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)

store.dispatch(getAllProducts())

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
     <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);