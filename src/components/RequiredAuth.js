import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const RequiredAuth = (props) => {
  const location = useLocation()
  const userInfo = useSelector((state) => state.app.userInfo)
  if (userInfo) {
    return props.children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default RequiredAuth
