import messagesAPIDataSource from 'data/api/dataSources/messagesAPIDataSource.js'
import axios from 'axios'

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
        console.log(imagesUrl)
        newMessage.images = imagesUrl
      }
      const res = await messagesAPIDataSource.saveNewMessage(newMessage)
      return res
    } catch (err) {
      console.log({ err })
      throw err
    }
  }

  async _uploadImgToCloudinary(msgImages) {
    try {
      const res = await Promise.all([
        ...msgImages.map((blobFile) => {
          const fd = new FormData()
          fd.append('file', blobFile)
          fd.append('upload_preset', 'imgs-upload')
          fd.append('cloud_name', 'imgs-store')

          return axios.post(
            'https://api.cloudinary.com/v1_1/imgs-store/image/upload',
            fd
          )
        }),
      ])
      if (res) {
        return res.map((res) => res.data.url)
      }
    } catch (err) {
      throw err
    }
  }

  async saveArrivalMessage(arrivalMsg) {
    try {
      //TODO: save arrivalMsg to client-side db or something else.
      console.log({ arrivalMsg })
    } catch (err) {
      throw err
    }
  }
}

const messagesRepository = new MessagesRepository()
export default messagesRepository
