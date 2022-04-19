import React from 'react'

import SearchItem from './SearchItem'

const SearchResultList = (props) => {
  const { searchResults } = props
  console.log({ searchResults })
  return (
    <div className="search-result-list">
      {searchResults.length > 0 &&
        searchResults.map((sr, idx) => {
          return <SearchItem key={idx} searchResult={sr} />
        })}
    </div>
  )
}

export default SearchResultList
