import { useDispatch, useSelector } from 'react-redux'
import { appActions } from 'infrastructure/store/slices/appSlice'

const useLogout = () => {
  const meId = useSelector((state) => state.app.userInfo.id)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(appActions.logoutUser(meId))
  }

  return {
    logout,
  }
}

export default useLogout
