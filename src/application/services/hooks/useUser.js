import { useSelector } from 'react-redux'

const useUser = () => {
  const me = useSelector((state) => state.app.userInfo)

  return me || null
}

export default useUser
