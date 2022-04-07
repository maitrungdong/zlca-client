import React from 'react'
import NavigationMenu from '../features/navigationMenu/NavigationMenu'

import LeftContent from '../layouts/LeftContent'
import RightContent from '../layouts/RightContent'

const ZaluChat = (props) => {
  return (
    <div className="zalu-chat">
      <div className="zalu-chat-container">
        <NavigationMenu />
        <LeftContent />
        <RightContent />
      </div>
    </div>
  )
}

export default ZaluChat
