import axios from '../lib/axios.js'

const conversationsService = {
  getAllConversOfUser: async (userId) => {
    try {
      return await axios.get(`/api/conversations?userId=${userId}`)
    } catch (err) {
      throw err
    }
  },
  getAllMessages: async (converId) => {
    try {
      return await axios.get(`/api/messages?converId=${converId}`)
    } catch (err) {
      throw err
    }
  },

  saveNewMessageOfMe: async (newMessage) => {
    try {
      return axios.post(`/api/messages`, newMessage)
    } catch (err) {
      throw err
    }
  },
}

export default conversationsService
