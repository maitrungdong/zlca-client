import axios from '../lib/axios.js'

const appService = {
  loginUser: async (userLoginInfo) => {
    try {
      return await axios.post('/api/auth/sign-in', userLoginInfo)
    } catch (err) {
      throw err
    }
  },

  logoutUser: async (userId) => {
    try {
      return await axios.post('/api/auth/sign-out', { userId })
    } catch (err) {
      throw err
    }
  },
  getAllConversOfUser: async (userId) => {
    try {
      return await axios.get(`/api/conversations?userId=${userId}`)
    } catch (err) {
      throw err
    }
  },
}

export default appService
