import axiosClient from 'config/axiosClient.js'

const conversAPIDataSource = {
  getConversOfUser: async (userId) => {
    try {
      return await axiosClient.get(`/api/conversations?userId=${userId}`)
    } catch (err) {
      throw err
    }
  },
}

export default conversAPIDataSource
