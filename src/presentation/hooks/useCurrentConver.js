import { useCustomSelector } from './useCustomSelector'

const useCurrentConver = () => {
  const currConver = useCustomSelector((state) => {
    const currConverId = state.convers.currentId
    return state.convers.convers.find((c) => c.id === currConverId)
  })

  console.log({ currConver })
  return currConver
}

export default useCurrentConver
