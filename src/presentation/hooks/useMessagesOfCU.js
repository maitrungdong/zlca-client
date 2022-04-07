import { useCustomSelector } from './useCustomSelector'

const useMessagesOfCU = () => {
  return useCustomSelector((state) => state.currentConver.messages) || []
}

export default useMessagesOfCU
