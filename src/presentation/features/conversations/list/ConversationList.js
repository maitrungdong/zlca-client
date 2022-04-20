import React, { useEffect } from 'react'

import Scrollbars from 'react-custom-scrollbars-2'

import ConversationItem from './ConversationItem'

import useConverListVM from './ConversationListVM.js'

const ConversationList = () => {
  const { convers, getConversOfCU, switchCurrentConver } = useConverListVM()

  useEffect(() => {
    getConversOfCU()
  }, [])

  return (
    <ul className="conversations-list">
      <Scrollbars>
        {convers.map((c) => {
          return (
            <ConversationItem
              key={c.id}
              conver={c}
              onClick={() => switchCurrentConver(c)}
            />
          )
        })}
      </Scrollbars>
    </ul>
  )
}

export default ConversationList
