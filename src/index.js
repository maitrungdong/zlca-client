import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { persistor } from './app/store'

import 'bulma/css/bulma.min.css'

import './styles/index.scss'

import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/lib/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PersistGate loading={<p>App is loading...</p>} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
