import { useSelector } from 'react-redux'

const useSelectCurrentConver = () => {
  const currentConver = useSelector(
    (state) => state.currentConver.currentConver
  )

  return currentConver || null
}

export default useSelectCurrentConver
