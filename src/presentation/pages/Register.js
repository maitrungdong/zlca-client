import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { appActions } from 'infrastructure/store/slices/appSlice.js'
import { useDispatch } from 'react-redux'

const Register = (props) => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [avatar, setAvatar] = useState(
    'https://images7.alphacoders.com/992/thumb-1920-992404.jpg'
  )
  const [avatarFile, setAvatarFile] = useState('')
  const [password, setPassword] = useState('')

  const handleInputValueChange = (e) => {
    switch (e.target.name) {
      case 'fullName':
        setFullName(e.target.value)
        break
      case 'phoneNumber':
        setPhoneNumber(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'avatar': // This case need consider again...
        //Using another method to get image info...
        setAvatarFile(e.target.value)
        //Update image and then we get image url to set avatar
        ///setAvatar()
        break
      default:
        break
    }
  }

  const handleUserRegister = () => {
    console.log({
      fullName,
      phoneNumber,
      avatar,
      password,
      avatarFile,
    })

    if (fullName === '') {
      return alert('Họ và tên không được để trống!')
    }

    if (phoneNumber === '') {
      return alert('Số điện thoại không được để trống!')
    }

    if (password === '') {
      return alert('Mật khẩu không được để trống!')
    }

    if (!phoneNumber.match(/^\d+$/)) {
      return alert('Số điện thoại chỉ chứa các kí tự từ 0 đến 9!')
    }

    if (password.length < 6) {
      return alert('Mật khẩu phải có độ dài ít nhất 6 kí tự!')
    }

    dispatch(
      appActions.registerUser({
        fullName,
        phoneNumber,
        avatar,
        password,
      })
    )
      .unwrap()
      .then((res) => {
        history('/login')
      })
  }

  return (
    <div className="register">
      <div className="register-container">
        <h2 className="register-header">Đăng kí Zalu Chat</h2>

        <div className="field">
          <p className="control has-icons-left ">
            <input
              className="input register-input"
              type="text"
              placeholder="Họ và tên"
              name="fullName"
              value={fullName}
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-register-icon">
              <i className="fas fa-user"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left ">
            <input
              className="input register-input"
              type="text"
              placeholder="Số điện thoại"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-register-icon">
              <i className="fas fa-phone"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input register-input"
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={password}
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-register-icon">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>

        {avatar && (
          <div className="avatar-preview">
            <img
              className="avatar-preview-img"
              src={`${avatar}`}
              alt="Preview user avatar"
            />
          </div>
        )}

        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input register-input"
              type="file"
              name="avatar"
              value={avatarFile}
              accept="image/png, image/jpeg"
              onChange={handleInputValueChange}
            />
            <span className="icon is-small is-left btn-register-icon">
              <i className="fas fa-image"></i>
            </span>
          </p>
        </div>
        <div className="field btns">
          <p className="control ">
            <button
              className="button is-info btn-login"
              onClick={handleUserRegister}
            >
              Đăng kí
            </button>
          </p>
          <p className="control">
            <button
              className="button is-light btn-login"
              onClick={() => {
                history('/')
              }}
            >
              Đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
