import axiosClient from 'config/axiosClient.js'

const authAPIDataSource = {
  login: async (userInfo) => {
    try {
      const res = await axiosClient.post('/api/auth/sign-in', userInfo)

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      //Ở chỗ này, nếu có những cái lỗi mà mình muốn retry!!!
      //(Dựa trên statusCode) thì mình sẽ retry ở đây.
      //Sau khi retry, rồi mà vẫn không thành công thì mới thực sự quăng lỗi.
      //Cái này có thể sẽ có những sự phức tạp nữa. Nên phải suy nghĩ kĩ.
      //=> Dành phần này: handle errors.
      //Có thể sẽ có những cái lỗi, và có những message thông báo, nó phải được
      //tinh chỉnh lại trước khi lên UI, vậy thì ta sẽ có thể phải xử lý ở đây.
      //=> Catch Error...
      throw err
    }
  },

  register: async (userInfo) => {
    try {
      const res = await axiosClient.post('/api/auth/register', userInfo)

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      throw err
    }
  },

  logout: async (userId) => {
    try {
      const res = await axiosClient.post('/api/auth/sign-out', { userId })

      if (res.success) {
        return res.data
      } else {
        throw new Error(res.messsage)
      }
    } catch (err) {
      throw err
    }
  },
}

export default authAPIDataSource
