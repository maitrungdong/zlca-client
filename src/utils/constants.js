export const messageType = Object.freeze({
  TEXT: 'M1',
  IMAGE: 'M2',
  LINK: 'M3',
})

export const serverBaseURLs = Object.freeze({
  API: 'http://localhost:8080',
  SOCKET: 'ws://localhost:8888',
})

export const socketEvents = Object.freeze({
  ADD_NEW_USER: 'event://add-new-user',
  SEND_MESSAGE: 'event://send-message',
  GET_MESSAGE: 'event://get-message',
  CREATE_CONVER: 'event://create-conver',
  GET_CONVER: 'event://get-conver',
})

export const errorCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
  BLOCKED_URL: 888,
  DISNETWORK_ERROR: 999,
})
