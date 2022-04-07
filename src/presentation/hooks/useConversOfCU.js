import { useCustomSelector } from './useCustomSelector'

const useConversOfCU = () => {
  const convers = useCustomSelector((state) => state.convers.convers)
  return convers || []
}

export default useConversOfCU
