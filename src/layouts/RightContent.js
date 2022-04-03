import React from 'react'
import { useSelector } from 'react-redux'

import RightContentHeader from '../components/RightContentHeader'
import ChatBox from '../components/ChatBox'
import RightContentFooter from '../components/RightContentFooter'

const RightContent = (props) => {
  const currentConver = useSelector(
    (state) => state.currentConver.currentConver
  )
  return (
    <div className="right-content">
      {currentConver ? (
        <>
          <RightContentHeader />
          <div className="right-content-body">
            <ChatBox />
          </div>
          <RightContentFooter />
        </>
      ) : (
        'Hãy chọn một cuộc trò chuyện hay có thể tạo mới tại đây'
      )}
    </div>
  )
}

export default RightContent
