import { useCurrentConver, useMessagesOfConver } from 'presentation/hooks'
import GetMessagesOfConver from 'domain/usecases/Messages/GetMessagesOfConver'
import messagesRepository from 'infrastructure/repositories/MessagesRepository'

export default function MessageListVM() {
  console.log('Chay o day may lan!')
  const currentConver = useCurrentConver()
  console.log({ currentConverId: currentConver.id })
  /** [ISSUES]: Có một vấn đề mới xảy ra! khi currentConver thay đổi
   * -> currentConver.id thay đổi nhưng cái custom hook useMessagesOfConver khi mình
   * truyền cái currentConver
   *
   */
  const messages = useMessagesOfConver(currentConver.id)
  console.log({ messages })
  const getMessages = async () => {
    const uc = new GetMessagesOfConver(messagesRepository)
    await uc.invoke(currentConver.id)
  }

  return {
    messages,
    getMessages,
  }
}
