import conversAPIDataSource from 'infrastructure/api/conversAPIDataSource.js'

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
}

const conversRepository = new ConversRepository()
export default conversRepository
