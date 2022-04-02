import React from 'react'
import { NavigationMenu } from '../../components'

import LeftContent from './leftContent'
import RightContent from './rightContent'

import './zaluChat.scss'

const ZaluChat = (props) => {
  // const [socketClient, setSocketClient] = useState(null)
  // const dispatch = useDispatch()
  // const me = useSelector((state) => state.app.userInfo)

  // useEffect(() => {
  //   if (me) {
  //     setSocketClient(io(serverBaseURLs.SOCKET))
  //   }
  // }, [me])

  // useEffect(() => {
  //   if (socketClient) {
  //     socketClient.emit('addUserEvent', me.id)
  //     socketClient.on('getMessageEvent', (data) => {
  //       dispatch(currentConverActions.saveArrivalMessage(data.message))
  //     })
  //   }
  // }, [socketClient, me, dispatch])

  return (
    <div className="zalu-chat">
      <div className="zalu-chat-container">
        <NavigationMenu />
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}

export default ZaluChat
