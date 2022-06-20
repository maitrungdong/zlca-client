import React from 'react'

import CurrentConverHeader from './components/CurrentConverHeader'
import MessageList from 'ui/features/messages/list/MessageList'
import CurrentConverFooter from './components/CurrentConverFooter'

import useCurrentConverVM from './CurrentConverVM.js'
import NoInternetBar from './components/NoInternetBar'
import Offline from 'ui/features/common/networkDetect/Offline'

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
    isSending,
  } = useCurrentConverVM()

  return (
    <div className="current-conver">
      <CurrentConverHeader
        title={currentConver.title}
        avatar={currentConver.avatar}
        lastActivity={currentConver.lastActivity}
      />
      <Offline>
        <NoInternetBar />
      </Offline>
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
        isSending={isSending}
      />
    </div>
  )
}

export default CurrentConver
