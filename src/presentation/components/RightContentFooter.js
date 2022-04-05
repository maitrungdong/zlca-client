import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { currentConverActions } from 'infrastructure/store/slices/currentConverSlice.js'

import { messageType } from '../../utils/constants.js'
import {
  useUser,
  useOtherMembers,
  useSelectCurrentConver,
} from 'application/services/hooks'

const RightContentFooter = (props) => {
  const dispatch = useDispatch()
  const currentConver = useSelectCurrentConver()
  const me = useUser()
  const friend = useOtherMembers(currentConver)

  const [messageTextContent, setMessageTextContent] = useState('')

  const handleSendMessage = async (e) => {
    if (messageTextContent.trim() !== '') {
      const newMessage = {
        conversationId: currentConver.id,
        senderId: me.id,
        messageType: messageType.TEXT,
        textContent: messageTextContent.trim(),
      }

      dispatch(currentConverActions.saveNewMessageOfMe(newMessage))
      setMessageTextContent('')
    }
  }

  const handleMessageTextContentChange = (e) => {
    setMessageTextContent(e.target.value)
  }

  return (
    <div className="right-content-footer">
      <ul className="right-content-footer__toolbar">
        <li className="right-content-footer__toolbar-item">
          <i className="far fa-smile"></i>
        </li>
        <li className="right-content-footer__toolbar-item">
          <i className="far fa-image"></i>
        </li>
        <li className="right-content-footer__toolbar-item">
          <i className="fas fa-paperclip"></i>
        </li>
        <li className="right-content-footer__toolbar-item">
          <i className="fas fa-text-height"></i>
        </li>
      </ul>
      <div className="right-content-footer__input-content">
        <textarea
          className="message-text"
          placeholder={`Nhập tin nhắn tới ${friend?.fullName}`}
          value={messageTextContent}
          onChange={handleMessageTextContentChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSendMessage()
            }
          }}
        />
        <button
          className="button is-info send-message"
          onClick={handleSendMessage}
        >
          <i className="fas fa-paper-plane"></i> Gửi tin
        </button>
      </div>
    </div>
  )
}

export default RightContentFooter
