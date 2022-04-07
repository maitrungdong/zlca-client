import { useCustomSelector } from './useCustomSelector'

const useCurrentConver = () => {
  return useCustomSelector((state) => state.currentConver.current) || null
}

export default useCurrentConver
