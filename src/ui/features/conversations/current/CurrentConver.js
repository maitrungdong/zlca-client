import React from 'react'

import CurrentConverHeader from './components/CurrentConverHeader'
import MessageList from 'ui/features/messages/list/MessageList'
import CurrentConverFooter from './components/CurrentConverFooter'

import useCurrentConverVM from './CurrentConverVM.js'

const CurrentConver = () => {
  const {
    currentConver,
    imgURLsPreview,
    hasImgsPreview,
    sendMessage,
    previewImages,
    deleteImgURLPreview,
    msgTextContent,
    setMsgTextContent,
  } = useCurrentConverVM()

  return (
    <div className="current-conver">
      <CurrentConverHeader
        title={currentConver.title}
        avatar={currentConver.avatar}
        lastActivity={currentConver.lastActivity}
      />
      <div
        className={`current-conver-body ${hasImgsPreview ? 'down-height' : ''}`}
      >
        <MessageList />
      </div>
      <CurrentConverFooter
        imgURLsPreview={imgURLsPreview}
        sendMessage={sendMessage}
        previewImages={previewImages}
        deleteImgURLPreview={deleteImgURLPreview}
        msgTextContent={msgTextContent}
        setMsgTextContent={setMsgTextContent}
      />
    </div>
  )
}

export default CurrentConver
