import messagesManager from 'managers/MessagesManager.js'
import { useEffect, useRef, useState } from 'react'

import { useCurrentConver, useMe } from 'ui/hooks'
import { useCustomSelector } from 'ui/hooks/useCustomSelector'

const CurrentConverVM = () => {
  const me = useMe()
  const currentConver = useCurrentConver()
  const isSending = useCustomSelector((state) => {
    return state.messages.isSendingMsg
  })

  const isOpenFileDialog = useRef(false)

  const [hasImgsPreview, setHasImgsPreview] = useState(false)
  const [imgURLsPreview, setImgURLsPreview] = useState([])
  const [msgTextContent, setMsgTextContent] = useState('')
  const msgImages = useRef([])

  const sendMessage = async () => {
    if (
      !isSending &&
      (msgTextContent.trim() !== '' || msgImages.current?.length > 0)
    ) {
      const newMessage = {
        conversationId: currentConver.id,
        senderId: me.id,
        textContent: msgTextContent,
        images: msgImages.current,
      }

      setMsgTextContent('')
      setImgURLsPreview([])
      msgImages.current = []

      await messagesManager.saveNewMessage(newMessage)
    }
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
    isSending,
  }
}

export default CurrentConverVM
