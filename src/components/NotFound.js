import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const history = useNavigate()
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h3>404</h3>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại!</p>
        <button
          className="button is-info"
          onClick={() => {
            history('/')
          }}
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  )
}

export default NotFound
