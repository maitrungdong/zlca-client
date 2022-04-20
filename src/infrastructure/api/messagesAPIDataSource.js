import axiosClient from 'config/axiosClient.js'

const messagesAPIDataSource = {
  getMessagesOfConver: async (converId) => {
    try {
      const res = await axiosClient.get(`/api/messages?converId=${converId}`)

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      throw err
    }
  },

  saveNewMessage: async (newMessage) => {
    try {
      const res = await axiosClient.post(`/api/messages`, newMessage)

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      throw err
    }
  },
}

export default messagesAPIDataSource
