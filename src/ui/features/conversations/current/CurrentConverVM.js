import messagesManager from 'managers/MessagesManager.js'
import { useEffect, useRef, useState } from 'react'

import { useCurrentConver, useMe } from 'ui/hooks'

const CurrentConverVM = () => {
  const me = useMe()
  const currentConver = useCurrentConver()

  const isOpenFileDialog = useRef(false)

  const [hasImgsPreview, setHasImgsPreview] = useState(false)
  const [imgURLsPreview, setImgURLsPreview] = useState([])
  const [msgTextContent, setMsgTextContent] = useState('')
  const msgImages = useRef([])

  const sendMessage = async () => {
    const newMessage = {
      conversationId: currentConver.id,
      senderId: me.id,
      textContent: msgTextContent,
      images: msgImages.current,
    }
    await messagesManager.saveNewMessage(newMessage)

    setMsgTextContent('')
    setImgURLsPreview([])
    msgImages.current = []
  }

  useEffect(() => {
    if (imgURLsPreview && imgURLsPreview.length > 0) {
      setHasImgsPreview(true)
    } else {
      setHasImgsPreview(false)
    }
  }, [imgURLsPreview])

  const deleteImgURLPreview = (idx) => {
    setImgURLsPreview((prevState) =>
      prevState.filter((_, imgURLIdx) => imgURLIdx !== idx)
    )
  }

  const previewImages = async () => {
    if (!isOpenFileDialog.current) {
      isOpenFileDialog.current = true

      const files = await window.electronAPI.openFile()
      if (files) {
        const blobFiles = files.map((file) => {
          const blobFile = new Blob([file.buffer])
          return blobFile
        })
        msgImages.current = [...blobFiles]

        const imgUrls = blobFiles.map((blobFile) => {
          return URL.createObjectURL(blobFile)
        })
        setImgURLsPreview(imgUrls)
      } else {
        setImgURLsPreview([])
      }
      isOpenFileDialog.current = false
    }
  }

  return {
    currentConver,
    sendMessage,
    imgURLsPreview,
    hasImgsPreview,
    isOpenFileDialog,
    previewImages,
    deleteImgURLPreview,
    msgTextContent,
    setMsgTextContent,
  }
}

export default CurrentConverVM
