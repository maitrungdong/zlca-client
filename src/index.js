import React from 'react'
import ReactDOM from 'react-dom'

import { persistor, store } from 'infrastructure/store/store'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Provider } from 'react-redux'

import App from './presentation/App'

import 'bulma/css/bulma.min.css'
import 'presentation/styles/index.scss'

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
