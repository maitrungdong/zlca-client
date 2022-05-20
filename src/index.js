import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import App from './ui/App'

import 'bulma/css/bulma.min.css'
import 'ui/styles/index.scss'
import { toast } from 'react-toastify'

window.addEventListener('online', function () {
  toast.success(
    `Mạng của bạn đã được khôi phục lại! Vui lòng refresh lại trang.`,
    {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  )
})

window.addEventListener('offline', function () {
  toast.error(`Lỗi kết nối internet! Vui lòng thử lại sau.`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
