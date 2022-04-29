import React, { useEffect, useRef } from 'react'

import Message from '../components/Message'

import useMessageListVM from './MessageListVM'
// import { Virtuoso, LogLevel } from 'react-virtuoso'
// import useVirtual from 'react-cool-virtual'

const MessageList = () => {
  const { messages, getMessages } = useMessageListVM()
  const messagesEndRef = useRef()
  // const { outerRef, innerRef, items, scrollToItem } = useVirtual({
  //   itemCount: messages.length,
  // })

  useEffect(() => {
    if (messages.length <= 0) {
      getMessages()
    }
  }, [])

  // useEffect(() => {
  //   scrollToItem(messages.length - 1)
  // }, [])

  // const renderMessage = (index, message) => {
  //   return <Message key={message.id} message={message} />
  // }

  useEffect(() => {
    messagesEndRef.current.scrollIntoView()
  }, [messages])

  return (
    <div className="message-list">
      {messages.map((m) => {
        return <Message key={m.id} message={m} />
      })}
      <div
        className="bottom-of-list"
        ref={(el) => (messagesEndRef.current = el)}
      ></div>
      {/* <div ref={innerRef}>
        {items.map(({ index, size, measureRef }) => {
          return (
            <div key={index} ref={measureRef} style={{ height: `${size}` }}>
              <Message key={index} message={messages[index]} />
            </div>
          )
        })}
      </div> */}
      {/* <Virtuoso
        style={{ height: '100%' }}
        data={messages}
        itemContent={renderMessage}
        followOutput={true}
      /> */}
    </div>
  )
}

export default MessageList
