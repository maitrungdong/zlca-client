import ZlcaClient from '../core/ZlcaClient.js'

const conversAPIDataSource = {
  pendingResult = null
  getConversOfUser: async (userId) => {
    const retrySchemas = [
      {
        maxRetries: 1,
        msBackoff: 100,
        errorCodes: [400, 404],
      },
      {
        maxRetries: 5,
        msBackoff: 200,
        errorCodes: [403, 500],
      },
      {
        maxRetries: 10,
        msBackoff: 300,
        errorCodes: [502, 503],
      },
    ]

    const request = {
      query: {
        userId,
      },
      isAbortable: true,
      retrySchemas,
    }

    try {
      this.pendingResult = ZlcaClient.get(`/api/conversations`, request)

      if(this.pendingResult){
      pendingResult.abort()
        
      }

      pendingResult.abort()

      pendingResult.then((res) => {
        console.log('>>>Resolved result: ', res)
      })

      pendingResult.catch((err) => {
        console.log('>>>Rejected result: ', err)
      })

      console.log(pendingResult)
      // debugger

      // if (res.success) {
      //   return res.data
      // } else {
      //   throw new Error(res.message)
      // }
    } catch (err) {
      console.log({ err })
      throw err
    }
  },
  getConverById: async (converId) => {
    try {
      const res = await ZlcaClient.get(`/api/conversations/${converId}`)
      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      throw err
    }
  },

  async chatWithUser(members) {
    try {
      const reqInit = {
        body: {
          members,
        },
      }
      const retryOptions = {
        maxRetries: 1,
      }
      const res = await ZlcaClient.post(
        '/api/conversations/chat-with-user',
        reqInit,
        retryOptions
      )

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.message)
      }
    } catch (err) {
      throw err
    }
  },
}

export default conversAPIDataSource
