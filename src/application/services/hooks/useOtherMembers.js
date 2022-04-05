import { useState, useEffect } from 'react'
import useUser from './useUser'

const useOtherMembers = (conver) => {
  const [friend, setFriend] = useState(null)
  const me = useUser()
  useEffect(() => {
    if (conver) {
      setFriend(conver.members.find((mem) => mem.id !== me.id))
    }
  }, [conver, me.id])

  return friend
}

export default useOtherMembers
