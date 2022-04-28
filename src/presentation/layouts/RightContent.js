import React from 'react'

import { useCurrentConver } from 'presentation/hooks'
import CurrentConver from 'presentation/features/conversations/current/CurrentConver.js'
import Carousel from 'presentation/features/carousel/Carousel'

const RightContent = () => {
  const currentConver = useCurrentConver()
  return (
    <div className="right-content">
      {currentConver ? <CurrentConver /> : <Carousel />}
    </div>
  )
}

export default RightContent
