import SocketClient from 'socket/socketClient.js'
import { socketEvents } from 'utils/constants.js'

class SaveNewMessage {
  _messagesRepo = null
  _conversRepo = null
  constructor(messagesRepo, conversRepo) {
    this._messagesRepo = messagesRepo
    this._conversRepo = conversRepo
  }
  async invoke(newMessage, receiverId) {
    try {
      if (
        newMessage.textContent.trim() === '' &&
        !newMessage?.images?.length > 0
      )
        return

      const res = await this._messagesRepo.saveNewMessage(newMessage)
      console.log({ res })
      if (res) {
        SocketClient.emit({
          event: socketEvents.SEND_MESSAGE,
          payload: {
            senderId: newMessage.senderId,
            receiverId: receiverId,
            message: res,
          },
        })
      }
      return res
    } catch (err) {
      throw err
    }
  }
}

export default SaveNewMessage
