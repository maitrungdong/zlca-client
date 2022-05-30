import { useMe, useConversOfCU } from 'ui/hooks'
import { useEffect } from 'react'

import conversManager from 'managers/ConversManager.js'

export default function ConversationListVM() {
  const convers = useConversOfCU()
  const me = useMe()

  console.log({ convers })

  useEffect(() => {
    const getConversOfCU = async (userId) => {
      await conversManager.loadConversOfUser(userId)
    }
    console.log({ me })
    if (me) {
      getConversOfCU(me.id)
    }
  }, [me])

  const switchCurrentConver = async (conver) => {
    if (!conver.isCurrentConver) {
      await conversManager.switchCurrentConver(conver.id)
    }
  }

  return {
    convers,
    switchCurrentConver,
  }
}
