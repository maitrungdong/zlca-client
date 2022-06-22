import ZlcaClient from '../core/ZlcaClient.js'

const messagesAPIDataSource = {
  getMessagesOfConver: async (converId) => {
    const retrySchemas = [
      {
        maxRetries: 10,
        msBackoff: 100,
        errorCodes: [404],
      },
    ]

    const requestSchema = {
      requestConfig: {
        params: {
          converId,
        },
      },
      isAbortable: true,
      retrySchemas,
    }

    const res = await ZlcaClient.get(`/api/messages`, requestSchema)
    return res.data
  },

  saveNewMessage: async (newMessage) => {
    try {
      const res = await ZlcaClient.post(`/api/messages`, {
        requestConfig: {
          data: {
            ...newMessage,
          },
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
