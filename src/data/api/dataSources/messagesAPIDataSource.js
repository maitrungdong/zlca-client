import ZlcaClient from '../core/ZlcaClient.js'

const messagesAPIDataSource = {
  getMessagesOfConver: async (converId) => {
    try {
      const res = await ZlcaClient.get(`/api/messages`, {
        query: {
          converId,
        },
      })

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
      const res = await ZlcaClient.post(`/api/messages`, {
        body: {
          ...newMessage,
        },
      })

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
