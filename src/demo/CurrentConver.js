import React, { useMemo, useState } from 'react'

import MessageList from './MessageList'
import CurrentConverFooter from './CurrentConverFooter'
import CurrentConverHeader from './CurrentConverHeader'

import { generateMessages } from './generateMessages'

const meId = 1
const CurrentConver = ({ backToMenu }) => {
  const [msgNum, setMsgNum] = useState(0)
  const [messages, setMessages] = useState([])
  const [lib, setLib] = useState(-1)

  useMemo(() => {
    const startTime = performance.now()
    const result = generateMessages(msgNum)
    const endTime = performance.now()

    console.log(
      `Thời gian để generate message list với ${msgNum} phần tử: ${
        endTime - startTime
      } ms.`
    )

    setMessages(result)
  }, [msgNum])

  const sendMessage = (newMessage) => {
    console.log({ newMessage })
  }

  const clearMsgList = () => {
    setMsgNum(null)
  }

  return (
    <div className="current-conver">
      <CurrentConverHeader
        title={'Nguyễn Nguyên Hương'}
        avatar={'https://www.w3schools.com/howto/img_avatar2.png'}
        lastActivity={'Đang online'}
        backToMenu={backToMenu}
        msgNum={msgNum}
        setMsgNum={setMsgNum}
        clearMsgList={clearMsgList}
      />
      <div className="current-conver-body">
        <MessageList lib={lib} messages={messages} />
      </div>
      <CurrentConverFooter setLib={setLib} sendMessage={sendMessage} />
    </div>
  )
}

export default CurrentConver
