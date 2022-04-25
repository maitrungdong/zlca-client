import SaveArrivalMessage from './SaveArrivalMessage'

class MessageController {
  constructor() {
    this.getMessage = new GetMessagesOfConver()
  }

  addListner() {}

  getMessage() {
    return this.getMessage.GetMessagesOfConver()
  }

  addMessage(msg) {
    SaveArrivalMessage.involke(msg)
    notifyEvent('newMessage', msg)
    //boardcast
  }
}

export default MessageController

EventEmitter
