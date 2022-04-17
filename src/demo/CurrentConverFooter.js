import React, { useState } from 'react'

const CurrentConverFooter = ({ setLib, sendMessage }) => {
  const [msgTextContent, setMsgTextContent] = useState('')
  return (
    <div className="current-conver-footer">
      <ul className="current-conver-footer__toolbar">
        <span style={{ fontSize: '18px' }}>Chọn một lib để render:</span>
        <button onClick={() => setLib(0)} className="button is-info is-medium">
          Virtualized
        </button>
        <button
          onClick={() => setLib(-1)}
          className="button is-primary is-medium"
        >
          Virtuoso
        </button>
        <button
          onClick={() => setLib(1)}
          className="button is-danger is-medium"
        >
          Cool Virtual
        </button>
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
