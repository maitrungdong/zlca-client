import ZlcaClient from '../core/ZlcaClient.js'

const authAPIDataSource = {
  login: async (userInfo) => {
    const res = await ZlcaClient.post('/api/auth/sign-in', {
      body: {
        ...userInfo,
      },
    })
    return res.data
  },

  register: async (userInfo) => {
    const res = await ZlcaClient.post('/api/auth/register', {
      body: {
        ...userInfo,
      },
    })
    return res.data
  },

  logout: async (userId) => {
    const res = await ZlcaClient.post('/api/auth/sign-out', {
      body: {
        userId,
      },
    })
    return res.data
  },
}

export default authAPIDataSource
