import ZlcaClient from '../core/ZlcaClient.js'

const authAPIDataSource = {
  login: async (userInfo) => {
    const res = await ZlcaClient.post('/api/auth/sign-in', {
      requestConfig: {
        data: {
          ...userInfo,
        },
      },
    })
    return res.data
  },

  register: async (userInfo) => {
    const res = await ZlcaClient.post('/api/auth/register', {
      requestConfig: {
        data: {
          ...userInfo,
        },
      },
    })
    return res.data
  },

  logout: async (userId) => {
    const res = await ZlcaClient.post('/api/auth/sign-out', {
      requestConfig: {
        data: {
          userId,
        },
      },
    })
    return res.data
  },
}

export default authAPIDataSource
