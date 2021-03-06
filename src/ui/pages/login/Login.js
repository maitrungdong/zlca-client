import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

import useLoginVM from './loginVM.js'

const Login = (props) => {
  const { phoneNumber, setPhoneNumber, password, setPassword, error, login } =
    useLoginVM()

  const history = useNavigate()

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

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-header">Đăng nhập Zalu Chat</h2>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input login-input"
              type="text"
              placeholder="Số điện thoại"
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
              placeholder="Mật khẩu"
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
              Đăng nhập
            </button>
          </p>
          <p className="control">
            <button
              className="button is-light btn-login"
              onClick={() => {
                history('/register')
              }}
            >
              Đăng kí
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
