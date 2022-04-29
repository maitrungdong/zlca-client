import React from 'react'

const searchItem = (props) => {
  const { searchResult } = props
  return (
    <div className="search-item">
      {searchResult.fullName} <br /> {searchResult.phoneNumber}
    </div>
  )
}

export default searchItem
