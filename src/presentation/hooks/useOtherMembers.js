import { useState, useEffect } from 'react'
import useMe from './useMe'

const useOtherMembers = (conver) => {
  const [friend, setFriend] = useState(null)
  const me = useMe()
  useEffect(() => {
    if (conver) {
      setFriend(conver.members.find((mem) => mem.id !== me.id))
    }
  }, [conver, me.id])
  return friend
}

export default useOtherMembers
