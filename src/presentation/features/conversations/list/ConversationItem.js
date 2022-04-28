import React, { useState } from 'react'

const ConversationItem = ({ conver, onClick }) => {
  const [showMoreTools, setShowMoreTools] = useState(false)

  return (
    <li
      className={`conversation-item ${conver.isCurrentConver ? 'current' : ''}`}
      onMouseOver={() => {
        setShowMoreTools(true)
      }}
      onMouseLeave={() => {
        setShowMoreTools(false)
      }}
      onClick={() => onClick()}
    >
      <div
        className="conversation-item__avatar"
        style={{
          backgroundImage: `url(${conver.avatar})`,
        }}
      ></div>
      <div className="conversation-item__content">
        <span className="conversation-item__name">{conver.title}</span>
        <span className="conversation-item__last-msg">
          {conver.lastMessageTitle}
        </span>
      </div>
      <i
        className={`fas fa-ellipsis-h conversation-item__more-tools ${
          !showMoreTools ? 'hide' : ''
        }`}
      ></i>
    </li>
  )
}

export default ConversationItem
