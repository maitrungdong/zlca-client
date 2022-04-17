// import img4k from './img-4k.jpg'
import img500kb from './img-500kb.png'

import { LoremIpsum } from 'lorem-ipsum'
import { nanoid } from '@reduxjs/toolkit'

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

export const generateConversations = (num) => {
  let results = []
  for (let i = 1; i <= num; i++) {
    results.push({
      id: nanoid(),
      title: lorem.generateWords(3),
      lastMessage: lorem.generateSentences(6),
      avatar: img500kb,
    })
  }

  return results
}
