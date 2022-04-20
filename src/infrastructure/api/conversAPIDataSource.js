import axiosClient from 'config/axiosClient.js'

const conversAPIDataSource = {
  getConversOfUser: async (userId) => {
    try {
      const res = await axiosClient.get(`/api/conversations?userId=${userId}`)
      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      throw err
    }
  },
  getConverById: async (converId) => {
    try {
      const res = await axiosClient.get(`/api/conversations/${converId}`)
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
