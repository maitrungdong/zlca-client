import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import ConversationList from '../features/conversations/list/ConversationList'
import NotificationList from '../features/notifications/NotificationList'
import SearchBar from '../features/search/SearchBar'

const LeftContent = (props) => {
  const location = useLocation()

  const [currentTab, setCurrentTab] = useState('')
  useEffect(() => {
    if (location.hash === '#notifications') {
      setCurrentTab('notificationTab')
    } else {
      setCurrentTab('')
    }
  }, [location])

  return (
    <div className="left-content">
      <div className="left-content-header">
        <SearchBar />
      </div>
      <div className="tabs is-large">
        <ul>
          <li
            className={`${currentTab !== 'notificationTab' ? 'is-active' : ''}`}
          >
            <a href="#conversations">Trò chuyện</a>
          </li>
          <li
            className={`${currentTab === 'notificationTab' ? 'is-active' : ''}`}
          >
            <a href="#notifications">Thông báo</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        {currentTab === 'notificationTab' ? (
          <NotificationList />
        ) : (
          <ConversationList />
        )}
      </div>
    </div>
  )
}

export default LeftContent
