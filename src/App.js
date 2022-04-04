import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ZaluChat from './pages/ZaluChat'
import Login from './pages/Login'
import Register from './pages/Register'
import RequiredAuth from './components/RequiredAuth'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import NotFound from './components/NotFound'

function App() {
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
