import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

<<<<<<< HEAD:src/presentation/pages/zaluChat/rightContent/rightContentFooter/index.js
import SocketContext from '../../../../../application/contexts/SocketContext'
=======
import { currentConverActions } from '../app/redux/slices/currentConverSlice.js'
>>>>>>> socket-middleware-redux:src/components/RightContentFooter.js

import { messageType } from '../utils/constants.js'

const RightContentFooter = (props) => {
  const dispatch = useDispatch()
  const currentConver = useSelector(
    (state) => state.currentConver.currentConver
  )
  const me = useSelector((state) => state.app.userInfo)
  const members = useSelector((state) => state.currentConver.members)

  const [friend, setFriend] = useState(null)
  useEffect(() => {
    setFriend(members.find((mem) => mem.id !== me.id))
  }, [members, me])

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
