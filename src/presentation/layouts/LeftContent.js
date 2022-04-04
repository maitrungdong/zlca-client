import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { conversationsActions } from 'infrastructure/store/slices/conversationsSlice.js'

import ConversationList from '../components/ConversationList'
import NotificationList from '../components/NotificationList'
import SearchBar from '../components/SearchBar'

const LeftContent = (props) => {
  const me = useSelector((state) => state.app.userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(conversationsActions.fetchAllConversOfUser(me.id))
  }, [me.id, dispatch])

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
        <i className="fas fa-user-plus left-content-header__icon"></i>
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
