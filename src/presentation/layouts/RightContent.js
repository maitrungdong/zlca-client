import React from 'react'

import { useCurrentConver } from 'presentation/hooks'
import CurrentConver from 'presentation/features/conversations/current/CurrentConver.js'

const RightContent = () => {
  const currentConver = useCurrentConver()
  return (
    <div className="right-content">
      {currentConver ? (
        <CurrentConver />
      ) : (
        'Hãy chọn một cuộc trò chuyện hay có thể tạo mới tại đây'
      )}
    </div>
  )
}

export default RightContent
