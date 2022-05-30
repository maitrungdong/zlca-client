import ZlcaClient from '../core/ZlcaClient.js'

const usersAPIDataSource = {
  searchUsersByKeyword: async (keyword) => {
    try {
      const reqInit = {
        query: {
          search: keyword,
        },
      }
      const retryOptions = {
        maxRetries: 1,
      }
      const res = await ZlcaClient.get(`/api/users`, reqInit, retryOptions)

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
}

export default usersAPIDataSource
