import { useCustomSelector } from './useCustomSelector'

const useMessagesOfCC = () => {
  return useCustomSelector((state) => state.messages.messages)
}

export default useMessagesOfCC
