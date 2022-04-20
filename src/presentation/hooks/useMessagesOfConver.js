import { useCustomSelector } from './useCustomSelector'

const useMessagesOfConver = () => {
  return useCustomSelector((state) => state.messages.messages)
}

export default useMessagesOfConver
