import React, { useState } from 'react'
import { currentConverActions } from 'infrastructure/store/slices/currentConverSlice.js'
import { useOtherMembers, useUser } from 'application/services/hooks'
import { useDispatch } from 'react-redux'

const ConversationItem = (props) => {
  const dispatch = useDispatch()
  const { conver, isCurrentConver } = props
  const friend = useOtherMembers(conver)

  const [showMoreTools, setShowMoreTools] = useState(false)

  const handleSwitchCurrentConver = (conver) => {
    if (!isCurrentConver)
      dispatch(currentConverActions.switchCurrentConver(conver))
  }

  return (
    <li
      className={`conversation-item ${isCurrentConver ? 'current' : ''}`}
      onMouseOver={() => {
        setShowMoreTools(true)
      }}
      onMouseLeave={() => {
        setShowMoreTools(false)
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
