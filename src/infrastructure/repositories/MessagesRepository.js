import messagesAPIDataSource from 'infrastructure/api/messagesAPIDataSource.js'

class MessagesRepository {
  async getMessagesOfConver(converId) {
    try {
      const res = await messagesAPIDataSource.getMessagesOfConver(converId)
      return res.messagesOfConver
    } catch (err) {
      throw err
    }
  }

  async saveNewMessage(newMessage) {
    try {
      const res = await messagesAPIDataSource.saveNewMessage(newMessage)
      return res
    } catch (err) {
      throw err
    }
  }
}

const messagesRepository = new MessagesRepository()
export default messagesRepository
