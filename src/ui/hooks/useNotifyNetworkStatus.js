import networkStatus from 'utils/networkStatus.js'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const useNotifNetworkStatus = () => {
  useEffect(() => {
    const notifyOnlineNetwork = function (_) {
      toast.success(
        `Mạng của bạn đã được khôi phục lại! Vui lòng refresh lại trang.`,
        {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
    }
    const notifyOfflineNetwork = function (_) {
      toast.error(`Lỗi kết nối internet! Vui lòng thử lại sau.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    networkStatus.addEventListener('online', notifyOnlineNetwork)
    networkStatus.addEventListener('offline', notifyOfflineNetwork)

    return () => {
      networkStatus.removeListener('online', notifyOnlineNetwork)
      networkStatus.removeListener('offline', notifyOfflineNetwork)
    }
  }, [])
}

export default useNotifNetworkStatus
