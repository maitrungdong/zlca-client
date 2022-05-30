import messagesRepository from 'data/repositories/MessagesRepository.js'
import conversRepository from 'data/repositories/ConversRepository.js'

import ObservableUseCase from 'usecases/ObservableUseCase.js'

class SaveNewMessage extends ObservableUseCase {
  _messagesRepo = null
  _conversRepo = null

  constructor(messagesRepo, conversRepo) {
    super()
    this._messagesRepo = messagesRepo
    this._conversRepo = conversRepo
  }
  async invoke(data, options = { shouldNotify: false }) {
    try {
      //debugger
      if (
        data.newMessage.textContent.trim() === '' &&
        !data.newMessage?.images?.length > 0
      )
        return

      const res = await this._messagesRepo.saveNewMessage(data.newMessage)
      //debugger
      if (options.shouldNotify) {
        this.notifyListeners({
          newMessage: res,
          receiverId: data.receiverId,
        })
      }

      return res
    } catch (err) {
      throw err
    }
  }
}

const saveNewMessageUseCase = new SaveNewMessage(
  messagesRepository,
  conversRepository
)
export default saveNewMessageUseCase
