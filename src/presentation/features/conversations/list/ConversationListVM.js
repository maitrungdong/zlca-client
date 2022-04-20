import { useMe, useConversOfCU } from 'presentation/hooks'

import conversManager from 'domain/managers/ConversManager.js'

export default function ConversationListVM() {
  const convers = useConversOfCU()
  const me = useMe()

  const switchCurrentConver = async (conver) => {
    if (!conver.isCurrentConver) {
      await conversManager.switchCurrentConver(conver.id)
    }
  }

  const getConversOfCU = async () => {
    await conversManager.loadConversOfUser(me.id)
  }

  return {
    convers,
    getConversOfCU,
    switchCurrentConver,
  }
}
