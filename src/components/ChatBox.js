import React, { useEffect, useRef } from 'react'

import Message from './Message'
import Scrollbars from 'react-custom-scrollbars-2'

import { useSelector } from 'react-redux'

const ChatBox = () => {
  const scrollEndChat = useRef(null)
  const messagesOfCurrentConver = useSelector(
    (state) => state.currentConver.messages
  )

  useEffect(() => {
    scrollEndChat.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesOfCurrentConver])

  return (
    <div className="chat-box">
      <Scrollbars>
        {messagesOfCurrentConver &&
          messagesOfCurrentConver.length > 0 &&
          messagesOfCurrentConver.map((m) => {
            return <Message key={m.id} message={m} ref={scrollEndChat} />
          })}
      </Scrollbars>
    </div>
  )
}

export default ChatBox
