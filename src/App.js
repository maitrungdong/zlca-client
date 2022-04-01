import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ZaluChat from './pages/zaluChat'
import Login from './pages/login'
import Register from './pages/register'
import RequiredAuth from './components/requiredAuth/RequiredAuth'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import './App.scss'

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
        <Route
          path="*"
          element={
            <RequiredAuth>
              <ZaluChat />
            </RequiredAuth>
          }
        />
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
