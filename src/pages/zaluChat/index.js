import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavigationMenu } from '../../components'

import LeftContent from './leftContent'
import RightContent from './rightContent'

import { io } from 'socket.io-client'

import SocketContext from '../../contexts/SocketContext.js'
import { serverBaseURLs } from '../../utils/constants'
import { useDispatch } from 'react-redux'

import { currentConverActions } from '../../app/redux/slices/currentConverSlice.js'

import './zaluChat.scss'

const ZaluChat = (props) => {
  const [socketClient, setSocketClient] = useState(null)
  const dispatch = useDispatch()
  const me = useSelector((state) => state.app.userInfo)

  useEffect(() => {
    if (me) {
      setSocketClient(io(serverBaseURLs.SOCKET))
    }
  }, [me])

  useEffect(() => {
    if (socketClient) {
      socketClient.emit('addUserEvent', me.id)
      socketClient.on('getMessageEvent', (data) => {
        dispatch(currentConverActions.saveArrivalMessage(data.message))
      })
    }
  }, [socketClient, me, dispatch])

  return (
    <SocketContext.Provider
      value={{
        socketClient: socketClient,
      }}
    >
      <div className="zalu-chat">
        <div className="zalu-chat-container">
          <NavigationMenu />
          <LeftContent />
          <RightContent />
        </div>
      </div>
    </SocketContext.Provider>
  )
}

export default ZaluChat
