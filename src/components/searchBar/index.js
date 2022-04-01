import React, { useEffect, useRef } from 'react'
import SearchResultList from '../searchResultList'

import './searchBar.scss'

const SearchBar = (props) => {
  const searchInputRef = useRef(null)

  useEffect(() => {})

  return (
    <div className="search-bar">
      <div className="control has-icons-left search-bar-control">
        <input
          className="input is-info is-rounded search-bar-input"
          type="text"
          placeholder="Tìm kiếm bạn bè"
          ref={searchInputRef}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>

      <div className="search-result-container">
        <SearchResultList />
      </div>
    </div>
  )
}

export default SearchBar
