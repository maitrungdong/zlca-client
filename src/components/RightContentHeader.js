import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RightContentHeader = () => {
  const currentConver = useSelector(
    (state) => state.currentConver.currentConver
  )
  const me = useSelector((state) => state.app.userInfo)
  const membersOfCurrentConver = useSelector(
    (state) => state.currentConver.members
  )

  const [friend, setFriend] = useState()
  useEffect(() => {
    setFriend(membersOfCurrentConver.find((mem) => mem.id !== me.id))
  }, [membersOfCurrentConver, me])

  return (
    <div className="right-content-header">
      <div className="right-content-header__left">
        <div
          className="right-content-header__avatar"
          style={{
            backgroundImage: `url(${currentConver.avatar}`,
          }}
        ></div>
        <div className="right-content-header__infos">
          <p className="right-content-header__infos-name">
            {currentConver.title ? currentConver.title : friend?.fullName}
          </p>
          <span className="right-content-header__infos-last-activity">
            {friend?.isOnline ? 'Đang online' : friend?.lastOnline}
          </span>
        </div>
      </div>
      <ul className="right-content-header__tools">
        <li className="right-content-header__tools-item">
          <i className="fas fa-search"></i>
        </li>
        <li className="right-content-header__tools-item">
          <i className="fas fa-phone-alt"></i>
        </li>
        <li className="right-content-header__tools-item">
          <i className="fas fa-video"></i>
        </li>
        <li className="right-content-header__tools-item">
          <i className="fas fa-columns"></i>
        </li>
      </ul>
    </div>
  )
}

export default RightContentHeader
