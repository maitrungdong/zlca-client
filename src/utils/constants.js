export const messageType = Object.freeze({
  TEXT: 'M1',
  IMAGE: 'M2',
  LINK: 'M3',
})

export const serverBaseURLs = Object.freeze({
  API: 'http://localhost:8080',
  SOCKET: 'ws://localhost:8888',
})

export const converEvents = Object.freeze({
  SEND_MESSAGE: 'send_message',
  RECEIVE_MESSAGE: 'receive_message',
})
