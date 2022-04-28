import React from 'react'

import CurrentConverHeader from './components/CurrentConverHeader'
import MessageList from 'ui/features/messages/list/MessageList'
import CurrentConverFooter from './components/CurrentConverFooter'
import useCurrentConverVM from './CurrentConverVM.js'

const CurrentConver = () => {
  const { currentConver, sendMessage } = useCurrentConverVM()
  return (
    <div className="current-conver">
      <CurrentConverHeader
        title={currentConver.title}
        avatar={currentConver.avatar}
        lastActivity={currentConver.lastActivity}
      />
      <div className="current-conver-body">
        <MessageList />
      </div>
      <CurrentConverFooter sendMessage={sendMessage} />
    </div>
  )
}

export default CurrentConver
