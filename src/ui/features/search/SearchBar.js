import React from 'react'
import SearchResultList from './SearchResultList'
import useSearchVM from './SearchVM.js'

const SearchBar = () => {
  const { searchValue, setSearchValue, searchResults, chatWithUser } =
    useSearchVM()

  return (
    <div className="search-bar">
      <div className="control has-icons-left search-bar-control">
        <input
          className="input is-info is-rounded search-bar-input"
          type="text"
          placeholder="Tìm kiếm bạn bè"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>

      <div className="search-result-container">
        {searchResults.length > 0 && (
          <SearchResultList
            searchResults={searchResults}
            chatWithUser={chatWithUser}
          />
        )}
      </div>
    </div>
  )
}

export default SearchBar
