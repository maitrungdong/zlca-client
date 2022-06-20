import conversRepository from 'data/repositories/ConversRepository.js'

import ObservableUseCase from 'usecases/ObservableUseCase.js'

class SaveArrivalConver extends ObservableUseCase {
  _conversRepo = null

  constructor(conversRepository) {
    super()
    this._conversRepo = conversRepository
  }

  async invoke(data, options = { shouldNotify: false }) {
    //TODO: nhận data từ socket (realtime), sau đó lưu vào bên phía client!
    await this._conversRepo.saveArrivalConver(data.arrivalConver)

    if (options.shouldNotify) {
      this.notifyListeners({
        arrivalConver: data.arrivalConver,
      })
    }
  }
}

const saveArrivalConverUseCase = new SaveArrivalConver(conversRepository)
export default saveArrivalConverUseCase
