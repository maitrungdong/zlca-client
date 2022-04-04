import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
<<<<<<< HEAD:src/presentation/pages/login/index.js
import { toast } from 'react-toastify'

import './login.scss'
import { useLogin } from '@application/services/hooks'

//How to get user loggined to redirect!!!...

=======
import { useDispatch } from 'react-redux'
import { appActions } from '../app/redux/slices/appSlice'
import { toast } from 'react-toastify'

>>>>>>> socket-middleware-redux:src/pages/Login.js
const Login = (props) => {
  const { phoneNumber, password, setPhoneNumber, setPassword, login, error } =
    useLogin()

  const history = useNavigate()
  const handleInputValueChange = (e) => {
    switch (e.target.name) {
      case 'phoneNumber':
        setPhoneNumber(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(`${error}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }, [error])

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-header">Welcome to Zalu Chat</h2>
        <div className="field ">
          <p className="control has-icons-left ">
            <input
              className="input login-input"
              type="text"
              placeholder="Phone number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-login-icon">
              <i className="fas fa-phone "></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input login-input"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-login-icon">
              <i className="fas fa-lock "></i>
            </span>
          </p>
        </div>
        <div className="field btns">
          <p className="control">
            <button className="button is-info btn-login" onClick={login}>
              Login
            </button>
          </p>
          <p className="control">
            <button
              className="button is-light btn-login"
              onClick={() => {
                history('/register')
              }}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
