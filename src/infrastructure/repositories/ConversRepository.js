import conversStore from 'infrastructure/store/redux/stores/ConversationsStore.js'

class ConversRepository {
  getConversOfUser(userId) {
    conversStore.getConversOfUser(userId)
  }
}

const conversRepository = new ConversRepository()
export default conversRepository
