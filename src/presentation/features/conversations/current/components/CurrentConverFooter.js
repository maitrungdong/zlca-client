import React, { useState } from 'react'

const CurrentConverFooter = ({ sendMessage }) => {
  const [msgTextContent, setMsgTextContent] = useState('')
  return (
    <div className="current-conver-footer">
      <ul className="current-conver-footer__toolbar">
        <li className="current-conver-footer__toolbar-item">
          <i className="far fa-smile"></i>
        </li>
        <li className="current-conver-footer__toolbar-item">
          <i className="far fa-image"></i>
        </li>
        <li className="current-conver-footer__toolbar-item">
          <i className="fas fa-paperclip"></i>
        </li>
        <li className="current-conver-footer__toolbar-item">
          <i className="fas fa-text-height"></i>
        </li>
      </ul>
      <div className="current-conver-footer__input-content">
        <textarea
          className="message-text"
          placeholder={`Nhập tin nhắn mới tại đây`}
          value={msgTextContent}
          onChange={(e) => {
            setMsgTextContent(e.target.value)
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              sendMessage(msgTextContent)
              setMsgTextContent('')
            }
          }}
        />
        <button
          className="button is-info send-message"
          onClick={() => {
            sendMessage(msgTextContent)
            setMsgTextContent('')
          }}
        >
          <i className="fas fa-paper-plane"></i> Gửi tin
        </button>
      </div>
    </div>
  )
}

export default CurrentConverFooter
