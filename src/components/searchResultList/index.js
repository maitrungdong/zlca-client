import React from 'react'

import { SearchItem } from '..'

import './searchResultList.scss'

const SearchResultList = (props) => {
  const { searchResults } = props
  return (
    <div className="search-result-list">
      {/* {searchResults &&
        searchResults.length > 0 &&
        searchResults.map((sr) => {
          return <SearchItem key={sr.id} searchResult={sr} />
        })} */}
      {/* <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem />
      <SearchItem /> */}
    </div>
  )
}

export default SearchResultList
