import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { appActions } from '../app/redux/slices/appSlice.js'

const NavigationMenu = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const dispatch = useDispatch()

  const me = useSelector((state) => state.app.userInfo)

  const handleLogout = () => {
    dispatch(appActions.logoutUser(me.id))
  }

  return (
    <ul className="nav-menu">
      <li
        className="nav-item"
        aria-controls="dropdown-user-menu"
        title={me.fullName}
        onClick={() => setShowUserMenu(true)}
      >
        <img src={me.avatar} alt="User avatar" className="nav-item__avatar" />
      </li>
      {showUserMenu && (
        <div className="dropdown">
          <div
            className="dropdown-menu"
            style={{ display: `${showUserMenu ? 'block' : 'none'}` }}
            id="dropdown-user-menu"
            role="menu"
          >
            <div className="dropdown-content">
              <li className="dropdown-item">Thông tin cá nhân</li>
              <hr className="dropdown-divider" />
              <li className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
              </li>
            </div>
          </div>
          <div
            className="dropdown-overlay"
            onClick={() => setShowUserMenu(false)}
          ></div>
        </div>
      )}
      <li className="nav-item active">
        <i className="far fa-comment nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="far fa-address-book nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="far fa-bell nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="far fa-calendar-check nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="fas fa-video nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="fas fa-cloud nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="fas fa-cut nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="far fa-star nav-item__icon"></i>
      </li>
      <li className="nav-item">
        <i className="fas fa-cog nav-item__icon"></i>
      </li>
    </ul>
  )
}

export default NavigationMenu
