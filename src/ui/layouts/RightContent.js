import React from 'react'

import { useCurrentConver } from 'ui/hooks'
import CurrentConver from 'ui/features/conversations/current/CurrentConver.js'
import Carousel from 'ui/features/carousel/Carousel'

const RightContent = () => {
  const currentConver = useCurrentConver()
  return (
    <div className="right-content">
      {currentConver ? <CurrentConver /> : <Carousel />}
    </div>
  )
}

export default RightContent
