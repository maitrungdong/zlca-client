import { useCustomSelector } from './useCustomSelector'

const useMe = () => {
  return useCustomSelector((state) => state.auth.userInfo) || null
}

export default useMe
