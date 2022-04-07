import axiosClient from 'config/axiosClient.js'

const conversationsService = {
  getConversOfUser: async (userId) => {
    try {
      return await axiosClient.get(`/api/conversations?userId=${userId}`)
    } catch (err) {
      throw err
    }
  },
  getMessages: async (converId) => {
    try {
      return await axiosClient.get(`/api/messages?converId=${converId}`)
    } catch (err) {
      throw err
    }
  },

  saveNewMessage: async (newMessage) => {
    try {
      return axiosClient.post(`/api/messages`, newMessage)
    } catch (err) {
      throw err
    }
  },
}

export default conversationsService
