import { useState, useEffect } from 'react'
import useMe from './useMe'
import useCurrentConver from './useCurrentConver'

const useOtherMembersOfCU = () => {
  const [friend, setFriend] = useState(null)
  const currentConver = useCurrentConver()
  const me = useMe()

  useEffect(() => {
    if (currentConver) {
      setFriend(currentConver.members.find((mem) => mem.id !== me.id))
    }
  }, [currentConver, me.id])

  return friend
}

export default useOtherMembersOfCU
