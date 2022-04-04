import React from 'react'

import { useSelector } from 'react-redux'

import Scrollbars from 'react-custom-scrollbars-2'
import ConversationItem from './ConversationItem'

const ConversationList = (props) => {
  const conversations = useSelector(
    (state) => state.conversations.conversations
  )

  return (
    <ul className="conversations-list">
      <Scrollbars>
        {conversations &&
          conversations.length > 0 &&
          conversations.map((conver) => {
            return <ConversationItem key={conver.id} conver={conver} />
          })}
      </Scrollbars>
    </ul>
  )
}

export default ConversationList
