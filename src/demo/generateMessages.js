import { nanoid } from '@reduxjs/toolkit'
import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 6,
    max: 12,
  },
  wordsPerSentence: {
    min: 4,
    max: 16,
  },
})

export const generateMessages = (num) => {
  const resutl = []
  for (let i = 0; i < num; i++) {
    const senderId = Math.round(Math.random())
    resutl.push({
      id: nanoid(),
      index: i + 1,
      text: lorem.generateSentences(Math.round(Math.random() * 10)),
      senderId,
      avatar:
        senderId === 1
          ? 'https://www.w3schools.com/howto/img_avatar.png'
          : 'https://www.w3schools.com/howto/img_avatar2.png',
    })
  }

  return resutl
}
