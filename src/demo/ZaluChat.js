import React, { useState } from 'react'

import LeftContent from './LeftContent'
import RightContent from './RightContent'

const ZaluChat = (props) => {
  const [listTypeToTest, setListTypeToTest] = useState(-1) // 1: conversationList, 2: messageList

  let content = null
  switch (listTypeToTest) {
    case 0:
      content = <RightContent backToMenu={() => setListTypeToTest(-1)} />
      break
    case 1:
      content = <LeftContent backToMenu={() => setListTypeToTest(-1)} />
      break
    default:
      content = (
        <div
          style={{
            background: 'whitesmoke',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
            padding: '50px',
          }}
        >
          <h3
            className="heading"
            style={{
              fontWeight: '700',
              fontSize: '22px',
              color: 'black',
            }}
          >
            Chọn kiểu danh sách để test!
          </h3>
          <div className="btns-gr">
            <button
              className="button is-info is-large"
              style={{ marginRight: '30px' }}
              onClick={() => {
                setListTypeToTest(1)
              }}
            >
              Conversations
            </button>
            <button
              className="button is-primary is-large"
              onClick={() => {
                setListTypeToTest(0)
              }}
            >
              Messages
            </button>
          </div>
        </div>
      )
      break
  }

  return content
}

export default ZaluChat
