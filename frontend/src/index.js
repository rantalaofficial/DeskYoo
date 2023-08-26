import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import reducers from './reducers/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() )

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>,
);