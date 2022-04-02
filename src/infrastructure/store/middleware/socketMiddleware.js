const socketMiddleware = () => {
  let socket = null

  const onOpen = (store) => (event) => {}

  const onClose = (store) => () => {}

  const onSendMessage = (store) => (event) => {
    const payload = JSON.parse(event.data)

    switch (payload.type) {
      case 'fsdf':
        break
      default:
        break
    }
  }

  return (store) => (next) => (action) => {
    switch (action.type) {
      case 'user_login_success':
        if (!socket) {
          socket.close()
        }
        //Connect to the remote host
        socket = new WebSocket(action.host)
        //Websocket handlers
        socket.onmessage = onSendMessage(store)
        socket.onclose = onClose(store)
        socket.onopen = onOpen(store)
        break

      case 'ws_disconnect':
        if (socket !== null) {
          socket.close()
        }
        socket = null
        break

      case 'NEW_MESSAGE':
        socket.send()
        break
      default:
        break
    }
  }
}
