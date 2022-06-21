import ZlcaClient from '../core/ZlcaClient.js'

const conversAPIDataSource = {
  getConversOfUser: async (userId) => {
    const retrySchemas = [
      {
        maxRetries: 1,
        msBackoff: 100,
        errorCodes: [400, 404],
      },
      {
        maxRetries: 5,
        msBackoff: 200,
        errorCodes: [403, 500],
      },
      {
        maxRetries: 10,
        msBackoff: 300,
        errorCodes: [502, 503],
      },
    ]

    const request = {
      query: {
        userId,
      },
      isAbortable: true,
      shouldHold: true,
      waitNetworkTime: 'infinite', // inifinite || 3600 seconds
      retrySchemas,
    }

    const pendingResult = ZlcaClient.get(`/api/conversations`, request)

    const res = await pendingResult
    console.log('>>>Resolved result: ', res)
    return res.data
  },
  getConverById: async (converId) => {
    const res = await ZlcaClient.get(`/api/conversations/${converId}`)
    return res.data
  },

  async chatWithUser(members) {
    const reqInit = {
      body: {
        members,
      },
    }
    const retryOptions = {
      maxRetries: 1,
    }
    const res = await ZlcaClient.post(
      '/api/conversations/chat-with-user',
      reqInit,
      retryOptions
    )

    return res.data
  },
}

export default conversAPIDataSource
