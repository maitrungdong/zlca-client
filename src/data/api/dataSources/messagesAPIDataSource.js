import ZlcaClient from '../core/ZlcaClient.js'

const messagesAPIDataSource = {
  controller: null,
  getMessagesOfConver: async (converId) => {
    try {
      if (messagesAPIDataSource.controller !== null) {
        messagesAPIDataSource.controller.abort()
      }

      messagesAPIDataSource.controller = new AbortController()
      const reqInit = {
        signal: messagesAPIDataSource.controller.signal,
        query: {
          converId,
        },
      }
      const retryOptions = {
        maxRetries: 10,
      }

      // setTimeout(() => {
      //   if (!controller.signal.aborted) {
      //     controller.abort()
      //     controller = null
      //   }
      //   console.log('Canceled!')
      // }, 10000)

      ZlcaClient.get('/api/messages', reqInit, retryOptions)

      const res = await ZlcaClient.get(`/api/messages`, reqInit, retryOptions)

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
