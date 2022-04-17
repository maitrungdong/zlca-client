import React from 'react'

import CurrentConver from 'demo/CurrentConver'

const RightContent = ({ backToMenu }) => {
  return (
    <div className="right-content">
      <CurrentConver backToMenu={backToMenu} />
    </div>
  )
}

export default RightContent
