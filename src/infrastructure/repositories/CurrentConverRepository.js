import currentConverStore from 'infrastructure/store/redux/stores/CurrentConverStore'

class CurrentConverRepository {
  saveNewMessage(newMessage) {
    currentConverStore.saveNewMessage(newMessage)
  }

  switchCurrentConver(newCurrentConver) {
    currentConverStore.switchCurrentConver(newCurrentConver)
  }

  saveArrivalMessage(arrivalMessage) {
    currentConverStore.saveArrivalMessage(arrivalMessage)
  }
}

const currentConverRepository = new CurrentConverRepository()
export default currentConverRepository
