import ZlcaClient from '../core/ZlcaClient.js'

const messagesAPIDataSource = {
  getMessagesOfConver: async (converId) => {
    try {
      let controller = new AbortController()
      const reqInit = {
        signal: controller.signal,
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
