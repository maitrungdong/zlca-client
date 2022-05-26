import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import ZaluChat from './pages/ZaluChat'
import Login from './pages/login/Login'
import Register from './pages/Register'
import RequiredAuth from './hoc/RequiredAuth'
import NotFound from './pages/NotFound'

import { ToastContainer } from 'react-toastify'
import networkStatus from 'utils/networkStatus.js'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  useEffect(() => {
    const notifyOnlineNetwork = function (_) {
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
    }
    const notifyOfflineNetwork = function (_) {
      toast.error(`Lỗi kết nối internet! Vui lòng thử lại sau.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    networkStatus.addEventListener('online', notifyOnlineNetwork)
    networkStatus.addEventListener('offline', notifyOfflineNetwork)

    return () => {
      networkStatus.removeListener('online', notifyOnlineNetwork)
      networkStatus.removeListener('offline', notifyOfflineNetwork)
    }
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/zalu-chat"
          element={
            <RequiredAuth>
              <ZaluChat />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/"
          element={
            <RequiredAuth>
              <ZaluChat />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App
