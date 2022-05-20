import BaseDBDataSource from './BaseDBDataSource.js'
import { LoremIpsum } from 'lorem-ipsum'
import { nanoid } from '@reduxjs/toolkit'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})
const OBJ_STORE_NAME = 'messages'
const ID_FIELD = 'msgId'

class MessagesDBDataSource extends BaseDBDataSource {
  // eslint-disable-next-line no-useless-constructor
  constructor(objStoreName, idField) {
    super(objStoreName, idField)
  }

  init(db) {
    super.init(db)

    this.OBJ_STORE.createIndex('converId', 'converId', { unique: false })
    this.OBJ_STORE.createIndex('msgType', 'msgType', { unique: false })
  }

  generateMsg(num) {
    for (let i = 1; i <= num; i++) {
      const msgContent = lorem.generateParagraphs(4)
      this.create({
        msgId: i,
        converId: nanoid(),
        senderId: nanoid(),
        repliedMsgId: 0,
        msgType: 'TEXT',
        content: msgContent,
        reactionId: nanoid(),
        isDeleted: 0,
        isOnline: 0,
        updatedAt: Date.now(),
        sentAt: Date.now(),
      })
    }
  }
}

const msgsDBDataSource = new MessagesDBDataSource(OBJ_STORE_NAME, ID_FIELD)
export default msgsDBDataSource
