import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { store, persistor } from './app/store'
import { Provider } from 'react-redux'

import 'bulma/css/bulma.min.css'

import './styles/index.scss'

import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/lib/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={<p>App is loading...</p>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
