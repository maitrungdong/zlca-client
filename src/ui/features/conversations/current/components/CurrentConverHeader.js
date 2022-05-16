import React from 'react'

const CurrentConverHeader = ({ avatar, title, lastActivity }) => {
  return (
    <div className="current-conver-header">
      <div className="current-conver-header__left">
        <div
          className="current-conver-header__avatar"
          style={{
            backgroundImage: `url(${avatar}`,
          }}
        ></div>
        <div className="current-conver-header__infos">
          <p className="current-conver-header__infos-title">{title}</p>
          <span className="current-conver-header__infos-last-activity">
            {lastActivity}
          </span>
        </div>
      </div>
      <ul className="current-conver-header__tools">
        <li className="current-conver-header__tools-item">
          <i className="fas fa-search"></i>
        </li>
        <li className="current-conver-header__tools-item">
          <i className="fas fa-phone-alt"></i>
        </li>
        <li className="current-conver-header__tools-item">
          <i className="fas fa-video"></i>
        </li>
        <li className="current-conver-header__tools-item">
          <i className="fas fa-columns"></i>
        </li>
      </ul>
    </div>
  )
}

export default CurrentConverHeader
