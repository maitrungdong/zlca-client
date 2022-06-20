import conversRepository from 'data/repositories/ConversRepository.js'

import ObservableUseCase from 'usecases/ObservableUseCase.js'

class ChatWithUser extends ObservableUseCase {
  _conversRepo = null
  constructor(conversRepo) {
    super()

    this._conversRepo = conversRepo
  }

  async invoke({ members, receiverId }, options = { shouldNotify: false }) {
    try {
      const res = await this._conversRepo.chatWithUser(members)
      if (options.shouldNotify) {
        this.notifyListeners({
          conversation: res.conver,
          isOldConver: res.isOld,
          receiverId: receiverId,
        })
      }
      return res
    } catch (err) {
      throw err
    }
  }
}

const chatWithUserUseCase = new ChatWithUser(conversRepository)
export default chatWithUserUseCase
