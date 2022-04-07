import Login from 'domain/usecases/Auth/Login'

import authRepository from 'infrastructure/repositories/AuthRepository'
import { useCustomSelector } from 'presentation/hooks/useCustomSelector'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const uc = new Login(authRepository)
    uc.invoke({
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
