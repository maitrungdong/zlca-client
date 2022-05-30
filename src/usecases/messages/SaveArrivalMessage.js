import messagesRepository from 'data/repositories/MessagesRepository.js'
import ObservableUseCase from 'usecases/ObservableUseCase.js'

class SaveArrivalMessage extends ObservableUseCase {
  _messagesRepo = null

  constructor(messagesRepo) {
    super()
    this._messagesRepo = messagesRepo
  }

  async invoke(data, options = { shouldNotify: false }) {
    //TODO: nhận data từ socket (realtime), sau đó lưu vào bên phía client!
    await this._messagesRepo.saveArrivalMessage(data.arrivalMessage)
    if (options.shouldNotify) {
      this.notifyListeners({
        arrivalMessage: data.arrivalMessage,
      })
    }
  }
}

const saveArrivalMessageUseCase = new SaveArrivalMessage(messagesRepository)
export default saveArrivalMessageUseCase
