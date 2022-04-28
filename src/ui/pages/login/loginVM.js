import { useCustomSelector } from 'ui/hooks/useCustomSelector'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import authManager from 'managers/AuthManager.js'

export default function LoginVM() {
  const navigate = useNavigate()
  const authError = useCustomSelector((state) => {
    return state.auth.errMessage
  })

  const isLoggedIn = useCustomSelector((state) => state.auth.isLoggedIn)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

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
    authManager.login({
      phoneNumber,
      password,
    })
  }

  return {
    phoneNumber,
    password,
    error,
    setPhoneNumber,
    setPassword,
    setError,
    login,
  }
}
