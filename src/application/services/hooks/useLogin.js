import { useState } from 'react'

import { AuthService } from '@domain/services'

const useLogin = (initialPhoneNumber = '', initialPassword = '') => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber)
  const [password, setPassword] = useState(initialPassword)
  const [error, setError] = useState('')

  const login = async () => {
    if (phoneNumber === '') {
      return setError('Phone number must be not empty!')
    }
    if (password === '') {
      return setError('Password must be not empty!')
    }
    if (!phoneNumber.match(/^\d+$/)) {
      return setError('Phone number must only contain numbers')
    }
    await AuthService.login(phoneNumber, password)
  }

  return {
    phoneNumber,
    password,
    setPhoneNumber,
    setPassword,
    login,
    error,
    setError,
  }
}

export default useLogin
