import { useCustomSelector } from './useCustomSelector'

const useCurrentConver = () => {
  return (
    useCustomSelector((state) => {
      return state.convers.current
    }) || null
  )
}

export default useCurrentConver
