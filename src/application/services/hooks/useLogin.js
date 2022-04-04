import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appActions } from 'infrastructure/store/slices/appSlice'
import { useNavigate } from 'react-router-dom'

const useLogin = (initialPhoneNumber = '', initialPassword = '') => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
  const [password, setPassword] = useState(initialPassword)
  const [error, setError] = useState('')

  const login = async () => {
    if (phoneNumber === '') {
      return setError('Số điện thoại không được để trống!')
    }
    if (password === '') {
      return setError('Mật khẩu không được để trống!')
    }
    if (!phoneNumber.match(/^\d+$/)) {
      return setError('Số điện thoại chỉ chứa các kí tự 0 đến 9')
    }

    dispatch(
      appActions.loginUser({
        phoneNumber,
        password,
      })
    )
      .unwrap()
      .then((payload) => {
        history('/')
      })
      .catch((payload) => {
        setError(payload.errMessage)
      })
  }

  return {
    phoneNumber,
    password,
    setPhoneNumber,
    setPassword,
    error,
    setError,
    login,
  }
}

export default useLogin
