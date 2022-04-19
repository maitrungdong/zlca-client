import { useCustomSelector } from './useCustomSelector'

const useMessagesOfConver = (converId) => {
  return (
    useCustomSelector((state) => {
      return state.messages.messagesOfConvers.find(
        (m) => m.converId === converId
      )?.messages
    }) || []
  )
}

export default useMessagesOfConver
