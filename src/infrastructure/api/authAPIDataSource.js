import axiosClient from 'config/axiosClient.js'

const authAPIDataSource = {
  login: async (userInfo) => {
    try {
      return await axiosClient.post('/api/auth/sign-in', userInfo)
    } catch (err) {
      throw err
    }
  },

  register: async (userInfo) => {
    try {
      return await axiosClient.post('/api/auth/register', userInfo)
    } catch (err) {
      throw err
    }
  },

  logout: async (userId) => {
    try {
      return await axiosClient.post('/api/auth/sign-out', { userId })
    } catch (err) {
      throw err
    }
  },
}

export default authAPIDataSource
