function catchError(error) {
  let message = ''
  if (error?.response?.status) {
    switch (error.response.status) {
      case 400:
      case 404:
        message = error.response.data.message
        break
      case 401:
      case 403:
        message = 'Bạn không có quyền truy cập'
        break
      default:
        break
    }
  } else {
    message = 'Lỗi hệ thống, vui lòng thử lại sau!'
  }

  return message
}
export default catchError
