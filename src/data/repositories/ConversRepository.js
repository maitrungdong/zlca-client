import conversAPIDataSource from 'data/api/dataSources/conversAPIDataSource.js'

class ConversRepository {
  async getConversOfUser(userId) {
    try {
      //Lấy các conversation từ trong cache nếu có,
      //Không có thì chọc vào DB,
      //Không có nữa thì lấy trên server.
      const res = await conversAPIDataSource.getConversOfUser(userId)
      return res.conversations
    } catch (err) {
      throw err
    }
  }
  async getConverById(converId) {
    try {
      return await conversAPIDataSource.getConverById(converId)
    } catch (err) {
      throw err
    }
  }

  async chatWithUser(members) {
    try {
      const res = await conversAPIDataSource.chatWithUser(members)
      return res
    } catch (err) {
      throw err
    }
  }

  async saveArrivalConver(arrivalConver) {
    try {
      //TODO: save arrivalConver to client-side db or something else.
      console.log({ arrivalConver })
    } catch (err) {
      throw err
    }
  }
}

const conversRepository = new ConversRepository()
export default conversRepository
