import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentConverActions } from 'infrastructure/store/slices/currentConverSlice.js'

const ConversationItem = (props) => {
  const dispatch = useDispatch()
  const { conver } = props
  const currentConver = useSelector(
    (state) => state.currentConver.currentConver
  )

  const [isCurrent, setIsCurrent] = useState(false)
  useEffect(() => {
    if (currentConver && conver.id === currentConver.id) {
      setIsCurrent(true)
    } else {
      setIsCurrent(false)
    }
  }, [currentConver, conver])

  const [showMoreTools, setShowMoreTools] = useState(false)
  const handleShowMoreTools = (action) => {
    if (action === 'show') setShowMoreTools(true)
    else {
      setShowMoreTools(false)
    }
  }

  const me = useSelector((state) => state.app.userInfo)

  const [friend, setFriend] = useState(null)
  useEffect(() => {
    setFriend(conver.members.find((mem) => mem.id !== me.id))
  }, [conver.members, me.id])

  const handleSwitchCurrentConver = (conver) => {
    if (!currentConver || conver.id !== currentConver.id) {
      dispatch(currentConverActions.fetchAllMessages(conver))
    }
  }

  return (
    <li
      className={`conversation-item ${isCurrent ? 'current' : ''}`}
      onMouseOver={() => {
        handleShowMoreTools('show')
      }}
      onMouseLeave={() => {
        handleShowMoreTools('hide')
      }}
      onClick={() => handleSwitchCurrentConver(conver)}
    >
      <div
        className="conversation-item__avatar"
        style={{
          backgroundImage: `url(${conver.avatar})`,
        }}
      ></div>
      <div className="conversation-item__content">
        <span className="conversation-item__name">
          {conver.title || friend?.fullName || 'Conversation'}
        </span>
        <p className="conversation-item__last-msg">
          {conver.lastMessage
            ? conver.lastMessage.textContent
            : 'Cuộc trò chuyện khá mới mẻ...'}
        </p>
      </div>

      <span className="conversation-item__last-time">Hôm qua</span>

      <i
        className={`fas fa-ellipsis-h conversation-item__more-tools ${
          !showMoreTools ? 'hide' : ''
        }`}
      ></i>
    </li>
  )
}

export default ConversationItem
