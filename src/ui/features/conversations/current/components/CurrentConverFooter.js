import React from 'react'

const CurrentConverFooter = ({
  imgURLsPreview,
  sendMessage,
  previewImages,
  deleteImgURLPreview,
  msgTextContent,
  setMsgTextContent,
}) => {
  return (
    <div className="current-conver-footer">
      <ul className="current-conver-footer__toolbar">
        <li className="current-conver-footer__toolbar-item">
          <i className="far fa-smile"></i>
        </li>
        <li
          className="current-conver-footer__toolbar-item"
          onClick={previewImages}
        >
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
              sendMessage()
            }
          }}
        />
        <button
          className="button is-info send-message"
          onClick={() => {
            sendMessage()
          }}
        >
          <i className="fas fa-paper-plane"></i> Gửi tin
        </button>
      </div>
      {imgURLsPreview && imgURLsPreview.length > 0 && (
        <div className="current-conver-footer__img-list-preview">
          {imgURLsPreview.map((imgUrl, idx) => {
            return (
              <div key={idx} className="img-to-preview">
                <img className="img" src={imgUrl} alt="message img" />
                <div
                  className="overlap"
                  onClick={() => deleteImgURLPreview(idx)}
                >
                  <i className="far fa-trash-alt"></i>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CurrentConverFooter
