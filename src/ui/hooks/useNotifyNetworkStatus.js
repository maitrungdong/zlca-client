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

    const changeNetworkHandler = (isOnline) => {
      isOnline ? notifyOnlineNetwork() : notifyOfflineNetwork()
    }

    window.ZlcaDetectNetwork.addEventListener('change', changeNetworkHandler)

    return () => {
      window.ZlcaDetectNetwork.removeEventListener(
        'change',
        changeNetworkHandler
      )
    }
  }, [])
}

export default useNotifNetworkStatus
