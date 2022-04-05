import React from 'react'

import Scrollbars from 'react-custom-scrollbars-2'
import ConversationItem from './ConversationItem'
import {
  useSelectCurrentConver,
  useSelectConvers,
} from 'application/services/hooks'

const ConversationList = (props) => {
  const convers = useSelectConvers()
  const cc = useSelectCurrentConver()

  return (
    <ul className="conversations-list">
      <Scrollbars>
        {convers.map((c) => {
          return (
            <ConversationItem
              key={c.id}
              conver={c}
              isCurrentConver={cc && cc.id === c.id}
            />
          )
        })}
      </Scrollbars>
    </ul>
  )
}

export default ConversationList
