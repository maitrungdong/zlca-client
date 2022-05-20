import ZlcaClient from '../core/ZlcaClient.js'

const conversAPIDataSource = {
  getConversOfUser: async (userId) => {
    const reqInit = {
      query: {
        userId,
      },
    }
    const retryOptions = {
      maxRetries: 1,
    }
    try {
      const res = await ZlcaClient.get(
        `/api/conversations`,
        reqInit,
        retryOptions
      )

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      console.log({ err })
      throw err
    }
  },
  getConverById: async (converId) => {
    try {
      const res = await ZlcaClient.get(`/api/conversations/${converId}`)
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

export default conversAPIDataSource
