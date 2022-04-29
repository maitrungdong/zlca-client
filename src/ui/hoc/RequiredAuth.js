import { useMe } from 'ui/hooks'
import { Navigate, useLocation } from 'react-router-dom'

const RequiredAuth = (props) => {
  const location = useLocation()
  const me = useMe()
  if (me) {
    return props.children
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default RequiredAuth
