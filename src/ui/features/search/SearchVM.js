import { useEffect, useState } from 'react'
import usersManager from 'managers/UsersManager.js'
import conversManager from 'managers/ConversManager.js'

const CurrentConverVM = () => {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const search = async () => {
      const res = await usersManager.searchUsersByKeyword(searchValue)
      return res
    }

    let searchTimeout = null
    if (searchValue.trim() !== '') {
      searchTimeout = setTimeout(async () => {
        const res = await search()
        if (res) {
          setSearchResults(res)
        }
      }, 250)
    } else {
      setSearchResults([])
    }

    return () => {
      if (searchTimeout) clearTimeout(searchTimeout)
    }
  }, [searchValue])

  const chatWithUser = async (user) => {
    console.log('Chatting with user...', user)
    //Steps:
    //TODO: Empty searchResults
    setSearchResults([])

    await conversManager.chatWithUser(user)
  }

  return {
    searchValue,
    setSearchValue,
    searchResults,
    chatWithUser,
  }
}

export default CurrentConverVM
