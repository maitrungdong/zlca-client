import React from 'react'

import SearchItem from './SearchItem'

const SearchResultList = (props) => {
  const { searchResults, chatWithUser } = props

  return (
    <div className="search-result-list">
      {searchResults.length > 0 &&
        searchResults.map((sr, idx) => {
          return (
            <SearchItem
              key={idx}
              searchResult={sr}
              chatWithUser={chatWithUser}
            />
          )
        })}
    </div>
  )
}

export default SearchResultList
