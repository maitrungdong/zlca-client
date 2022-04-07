import React from 'react'

import CurrentConverHeader from './components/CurrentConverHeader'
import MessageList from 'presentation/features/conversations/current/messageList/messageList'
import CurrentConverFooter from './components/CurrentConverFooter'
import useViewModel from './currentConverVM.js'

const CurrentConver = () => {
  const { currentConver, sendMessage } = useViewModel()
  return (
    <div className="current-conver">
      <CurrentConverHeader
        title={currentConver.title}
        avatar={currentConver.avatar}
        lastActivity={currentConver.lastActivity}
      />
      <div className="current-conver-body">
        <MessageList messages={currentConver.messages} />
      </div>
      <CurrentConverFooter sendMessage={sendMessage} />
    </div>
  )
}

export default CurrentConver
