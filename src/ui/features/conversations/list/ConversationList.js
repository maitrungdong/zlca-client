import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import ConversationItem from './components/ConversationItem'

import useConverListVM from './ConversationListVM.js'

const ConversationList = () => {
  const { convers, switchCurrentConver } = useConverListVM()
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
