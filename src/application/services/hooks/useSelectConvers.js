import { useSelector } from 'react-redux'
const useSelectConvers = () => {
  const convers = useSelector((state) => state.conversations.conversations)

  return convers || []
}

export default useSelectConvers
