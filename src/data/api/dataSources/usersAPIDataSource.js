import ZlcaClient from '../core/ZlcaClient.js'

const usersAPIDataSource = {
  searchUsersByKeyword: async (keyword) => {
    const retrySchemas = [
      {
        maxRetries: 1,
        msBackoff: 1000,
      },
    ]
    const request = {
      params: {
        search: keyword,
      },
      retrySchemas,
    }
    const res = await ZlcaClient.get(`/api/users`, request)
    return res.data
  },
}

export default usersAPIDataSource
