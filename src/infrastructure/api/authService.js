import axios from '../../lib/axios.js'

const authService = {
  login: async (userInfo) => {
    try {
      return await axios.post('/api/auth/sign-in', userInfo)
    } catch (err) {
      throw err
    }
  },

  logout: async (userId) => {
    try {
      return await axios.post('/api/auth/sign-out', { userId })
    } catch (err) {
      throw err
    }
  },
}

export default authService
