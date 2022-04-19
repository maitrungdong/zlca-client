import { useMe, useCurrentConver, useConversOfCU } from 'presentation/hooks'

import SwitchCurrentConver from 'domain/usecases/Convers/SwitchCurrentConver'

import GetConversOfUser from 'domain/usecases/Convers/GetConversOfUser'
import conversRepository from 'infrastructure/repositories/ConversRepository'

export default function ConversationListVM() {
  const cvs = useConversOfCU()
  let convers = [...cvs]

  const currentConver = useCurrentConver()
  const me = useMe()

  if (convers && convers.length > 0) {
    convers = convers.map((c) => {
      const conver = Object.assign({}, c)
      const friend = conver.members.find((mem) => mem.id !== me?.id)

      if (!conver.title) {
        if (friend?.fullName) {
          conver.title = friend.fullName
        } else {
          conver.title = 'Cuộc trò chuyện'
        }
      }

      const subDesc = conver.lastMessage?.textContent
        ? conver.lastMessage.textContent.slice(0, 60)
        : 'Bắt đầu trò chuyện ngay!'

      conver.isCurrentConver = currentConver?.id === conver.id
      conver.subDesc = subDesc

      return conver
    })
  } else {
    convers = []
  }

  const switchCurrentConver = async (conver) => {
    if (!conver.isCurrentConver) {
      const uc = new SwitchCurrentConver(conversRepository)
      await uc.invoke(conver)
    }
  }

  const getConversOfCU = async () => {
    const uc = new GetConversOfUser(conversRepository)
    await uc.invoke(me.id)
  }

  return {
    convers,
    getConversOfCU,
    switchCurrentConver,
  }
}
