import ZlcaClient from '../core/ZlcaClient.js'

const authAPIDataSource = {
  login: async (userInfo) => {
    try {
      const res = await ZlcaClient.post('/api/auth/sign-in', {
        body: {
          ...userInfo,
        },
      })

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      throw err
    }
  },

  register: async (userInfo) => {
    try {
      const res = await ZlcaClient.post('/api/auth/register', {
        body: {
          ...userInfo,
        },
      })

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      throw err
    }
  },

  logout: async (userId) => {
    try {
      const res = await ZlcaClient.post('/api/auth/sign-out', {
        body: {
          userId,
        },
      })

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      throw err
    }
  },
}

export default authAPIDataSource
