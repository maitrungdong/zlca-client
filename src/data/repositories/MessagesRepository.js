import messagesAPIDataSource from 'data/api/dataSources/messagesAPIDataSource.js'
import ZlcaClient from 'data/api/core/ZlcaClient.js'

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
      if (newMessage?.images?.length > 0) {
        const imagesUrl = await this._uploadImgToCloudinary(newMessage.images)
        newMessage.images = imagesUrl
      }
      const res = await messagesAPIDataSource.saveNewMessage(newMessage)
      return res
    } catch (err) {
      throw err
    }
  }

  async _uploadImgToCloudinary(msgImages) {
    const res = await Promise.all([
      ...msgImages.map((blobFile) => {
        const fd = new FormData()
        fd.append('file', blobFile)
        fd.append('upload_preset', 'imgs-upload')
        fd.append('cloud_name', 'imgs-store')

        return ZlcaClient.post(
          `https://api.cloudinary.com/v1_1/imgs-store/image/upload`,
          fd
        )
      }),
    ])

    if (res) {
      return res.map((res) => res.url)
    }
  }
}

const messagesRepository = new MessagesRepository()
export default messagesRepository
