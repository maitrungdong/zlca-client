import React, { useEffect, useRef, useState } from 'react'
import SearchResultList from './SearchResultList'

const data = [
  {
    phoneNumber: '041212122',
    fullName: 'ABC',
  },
  {
    phoneNumber: '0363863748',
    fullName: 'BCD',
  },
  {
    phoneNumber: '036666689',
    fullName: 'QWE',
  },
  {
    phoneNumber: '041212122',
    fullName: 'TRU',
  },
  {
    phoneNumber: '041212122',
    fullName: 'IUO',
  },
  {
    phoneNumber: '041212122',
    fullName: 'ABC',
  },
]

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const search = () => {
      const result = []
      data.forEach((d) => {
        if (
          searchValue.trim() !== '' &&
          (d.fullName.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
            d.phoneNumber.includes(searchValue))
        ) {
          result.push(d)
        }
      })

      return result
    }

    const searchTimeout = setTimeout(() => {
      const res = search()
      if (res) {
        setSearchResults(res)
      }
    }, 500)

    return () => {
      clearTimeout(searchTimeout)
    }
  }, [searchValue])

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
          <SearchResultList searchResults={searchResults} />
        )}
      </div>
    </div>
  )
}

export default SearchBar
